import { images } from "@/constants";
import { appwriteConfig, databases } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg text-gray-400">User not found</Text>
      </SafeAreaView>
    );
  }

  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(user.phone_number || "");
  const [address1, setAddress1] = useState(user.address_home || "");
  const [address2, setAddress2] = useState(user.address_work || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        user.$id,
        {
          phone_number: phone,
          address_home: address1,
          address_work: address2,
        }
      );
      Alert.alert("Success", "Profile updated successfully.");
      setEditing(false);
    } catch (e) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "rgba(255,255,255,0.95)", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={images.arrowBack} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
          <Text className="text-lg font-quicksand-semibold text-dark-100">Profile</Text>
          <Image source={images.search} className="w-5 h-5" resizeMode="contain" />
        </View>

        {/* Avatar */}
        <View className="items-center mb-6">
          <View className="profile-avatar">
            <Image source={{ uri: user.avatar || images.avatar }} className="w-28 h-28 rounded-full" />
            <TouchableOpacity className="profile-edit">
              <Image source={images.pencil} className="w-4 h-4" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Card */}
        <View className="bg-white rounded-2xl px-4 py-6 mb-6 shadow-md">
          {/* Full Name */}
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.person} className="w-7 h-7" />
            </View>
            <View>
              <Text className="label">Full Name</Text>
              <Text className="base-semibold text-dark-100">{user.name}</Text>
            </View>
          </View>
          {/* Email */}
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.envelope} className="w-7 h-7" />
            </View>
            <View>
              <Text className="label">Email</Text>
              <Text className="base-semibold text-dark-100">{user.email}</Text>
            </View>
          </View>
          {/* Phone */}
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.phone} className="w-7 h-7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="label">Phone number</Text>
              {editing ? (
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  className="input"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text className="base-semibold text-dark-100">{phone || "No phone number set"}</Text>
              )}
            </View>
          </View>
          {/* Address 1 */}
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.location} className="w-7 h-7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="label">Address 1 - (Home)</Text>
              {editing ? (
                <TextInput
                  value={address1}
                  onChangeText={setAddress1}
                  placeholder="Enter home address"
                  className="input"
                />
              ) : (
                <Text className="base-semibold text-dark-100">{address1 || "No home address set"}</Text>
              )}
            </View>
          </View>
          {/* Address 2 */}
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.location} className="w-7 h-7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="label">Address 2 - (Work)</Text>
              {editing ? (
                <TextInput
                  value={address2}
                  onChangeText={setAddress2}
                  placeholder="Enter work address"
                  className="input"
                />
              ) : (
                <Text className="base-semibold text-dark-100">{address2 || "No work address set"}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Edit/Save Buttons */}
        <TouchableOpacity
          className="w-full py-4 rounded-xl border border-primary bg-primary/10 mb-3 items-center"
          onPress={() => (editing ? handleSave() : setEditing(true))}
          disabled={saving}
        >
          <Text className="text-primary font-quicksand-semibold text-base text-center">
            {editing ? (saving ? "Saving..." : "Save") : "Edit Profile"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-4 rounded-xl border border-red-400 bg-red-50 flex-row items-center justify-center"
          onPress={async () => {
            const { account } = await import("@/lib/appwrite");
            await account.deleteSession("current");
            router.replace("/(auth)/sign-in");
          }}
        >
          <View className="flex-row items-center justify-center">
            <Image source={images.logout} className="w-5 h-5 mr-2" />
            <Text className="text-red-400 font-quicksand-semibold text-base">Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
