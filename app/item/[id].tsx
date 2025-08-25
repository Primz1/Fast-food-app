import CustomButton from "@/components/CustomButton";
import { images, sides, toppings } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import type { MenuItem } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




import { appwriteConfig, databases } from "@/lib/appwrite";
import { useEffect } from "react";

const ItemDetails = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const docId = Array.isArray(id) ? id[0] : id;
        if (!docId) throw new Error('No id');
        const res = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCollectionId,
          docId
        );
        setItem(res as MenuItem);
      } catch (e) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;
    addItem({
      id: item.$id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    });
    router.push("/(tabs)/cart");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg text-gray-400">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg text-gray-400">Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="pb-32 px-4 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={images.arrowBack} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
          <Text className="text-lg font-quicksand-semibold text-dark-100">{item.name}</Text>
          <Image source={images.search} className="w-5 h-5" resizeMode="contain" />
        </View>

        {/* Item Image */}
        <View className="items-center my-2">
          <Image source={{ uri: item.image_url }} className="w-44 h-44" resizeMode="contain" />
        </View>

        {/* Title, type, rating, price */}
        <Text className="h1-bold text-dark-100 mb-1">{item.name}</Text>
        <Text className="text-base text-gray-400 mb-1">{item.type}</Text>
        <View className="flex-row items-center mb-1">
          <Text className="text-primary text-xl font-bold mr-2">${item.price?.toFixed(2)}</Text>
          <Text className="text-yellow-400 text-base mr-1">★</Text>
          <Text className="text-base text-gray-400">{item.rating}/5</Text>
        </View>

        {/* Nutrition & bun */}
        <View className="flex-row gap-6 mb-2">
          <View>
            <Text className="text-xs text-gray-400">Calories</Text>
            <Text className="base-semibold text-dark-100">{item.calories} Cal</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">Protein</Text>
            <Text className="base-semibold text-dark-100">{item.protein}g</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-400">Bun Type</Text>
            <Text className="base-semibold text-dark-100">{item.bun || 'Whole Wheat'}</Text>
          </View>
        </View>

        {/* Delivery info */}
        <View className="flex-row items-center justify-between bg-orange-50 rounded-xl px-4 py-2 mb-3">
          <Text className="text-xs text-primary">Free Delivery</Text>
          <Text className="text-xs text-gray-400">20 - 30 mins</Text>
          <Text className="text-xs text-yellow-400">★ 4.5</Text>
        </View>

        {/* Description */}
        <Text className="text-base text-gray-500 mb-4">{item.description}</Text>

        {/* Toppings */}
        <Text className="base-semibold text-dark-100 mb-2">Toppings</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {toppings.map((top, idx) => (
            <View key={idx} className="items-center bg-white rounded-xl shadow-md px-3 py-2 mr-3">
              <Image source={top.image} className="w-12 h-12 mb-1" />
              <Text className="text-xs text-dark-100">{top.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Side options */}
        <Text className="base-semibold text-dark-100 mb-2">Side options</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {sides.map((side, idx) => (
            <View key={idx} className="items-center bg-white rounded-xl shadow-md px-3 py-2 mr-3">
              <Image source={side.image} className="w-12 h-12 mb-1" />
              <Text className="text-xs text-dark-100">{side.name}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Quantity and Add to cart */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 flex-row items-center justify-between border-t border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2">
            <Text className="text-2xl text-primary">-</Text>
          </TouchableOpacity>
          <Text className="text-lg font-quicksand-semibold mx-2">{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-primary items-center justify-center ml-2">
            <Text className="text-2xl text-white">+</Text>
          </TouchableOpacity>
        </View>
        <CustomButton title={`Add to cart ($${(item.price * quantity).toFixed(2)})`} onPress={handleAddToCart} style="flex-1 ml-4" />
      </View>
    </SafeAreaView>
  );
};

export default ItemDetails;
