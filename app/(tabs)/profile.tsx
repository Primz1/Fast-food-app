import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setUser(null);
          setIsAuthenticated(false);
          router.replace("/sign-in"); // or "/"
        }
      }
    ]);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <CustomHeader title="Your Profile" />

        <View className="items-center mt-8">
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : images.avatarPlaceholder
            }
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="h3-bold text-dark-100">
            {user?.name || "Guest User"}
          </Text>
          <Text className="paragraph-regular text-gray-400 mt-1">
            {user?.email || "No email"}
          </Text>
        </View>

        <View className="mt-10 px-5 gap-4">
          <TouchableOpacity
            className="bg-gray-100 p-4 rounded-xl"
            onPress={() => router.push("/orders")}
          >
            <Text className="paragraph-semibold text-dark-100">Order History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 p-4 rounded-xl"
            onPress={() => router.push("/settings")}
          >
            <Text className="paragraph-semibold text-dark-100">Settings</Text>
          </TouchableOpacity>

          <CustomButton
            title="Log Out"
            onPress={handleLogout}
            style="bg-red-500 mt-4"
            textStyle="text-white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
