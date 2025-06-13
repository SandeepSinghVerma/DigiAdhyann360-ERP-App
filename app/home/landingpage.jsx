import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Feather";
import LogoImage from "../../assets/images/DigiAdhyann360.png";
import CustomButton from "../../components/CustomButton";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("loggedInUser");
      if (user) {
        setUsername(JSON.parse(user).username);
      } else {
        router.replace("/");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    Toast.show({
      type: "success",
      text1: "Signed Out",
      text2: "You’ve been logged out successfully 👋",
      position: "bottom",
    });

    setTimeout(async () => {
      await AsyncStorage.removeItem("loggedInUser");
      router.replace("/"); // Redirect to login
    }, 1500);
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: handleLogout },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow mt-8">
        <View className="flex-row items-center">
          <Image
            source={LogoImage}
            className="w-8 h-8 mr-2"
            resizeMode="contain"
          />
          <Text className="text-lg font-bold text-[#012353] font-serif">
            DigiAdhyann 360
          </Text>
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {username} 👋
        </Text>
        <Text className="text-base text-gray-600 mb-6 text-center">
          This is your dashboard. Explore features and manage your account.
        </Text>

        <View className="w-full max-w-xs bg-white rounded-lg shadow p-4 items-center">
          <Icon name="user" size={32} color="#27ae60" />
          <Text className="mt-2 text-lg font-semibold text-gray-700">
            Profile
          </Text>
          <Text className="text-gray-500">Username: {username}</Text>
        </View>
      </View>

      {/* Sign Out Button */}
      <View className="px-4 pb-6">
        <CustomButton onPress={confirmLogout} className="self-center mb-6">
          Sign Out
        </CustomButton>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default LandingPage;
