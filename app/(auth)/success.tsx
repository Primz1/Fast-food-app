import { images } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Success = () => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-start px-6">
      <Text className="text-lg font-quicksand-semibold text-dark-100 mt-6">Success</Text>

      <View className="w-full mt-6 items-center">
        <Image source={images.success} className="w-40 h-40 rounded-md" resizeMode="contain" />
      </View>

      <View className="w-full bg-white rounded-2xl shadow-md mt-8 p-6 items-center">
        <View className="w-12 h-12 bg-amber-50 rounded-full items-center justify-center mb-4">
          <Image source={images.check} className="w-6 h-6" resizeMode="contain" />
        </View>
        <Text className="h2-bold text-dark-100 mb-2">Login Successful!</Text>
        <Text className="paragraph-regular text-gray-300 text-center mb-4">You're all set to continue where you left off.</Text>

        <TouchableOpacity
          className="w-full py-3 rounded-xl bg-primary items-center"
          onPress={() => router.replace('/')}
        >
          <Text className="text-white font-quicksand-semibold">Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Success;
