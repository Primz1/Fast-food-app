import CustomHeader from "@/components/CustomHeader";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = () => {
  return (
    <SafeAreaView className="bg-white h-full px-5">
      <CustomHeader title="Your Orders" />
      <Text className="paragraph-regular mt-4 text-gray-400">
        You haven't placed any orders yet.
      </Text>
    </SafeAreaView>
  );
};

export default Orders;
