import CustomHeader from "@/components/CustomHeader";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView className="bg-white h-full px-5">
      <CustomHeader title="Settings" />
      <Text className="paragraph-regular mt-4 text-gray-400">
        Settings screen coming soon.
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
