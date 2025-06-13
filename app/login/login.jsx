import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- Add this import!
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LogoImage from "../../assets/images/DigiAdhyann360.png";
import LoginBackgroundImage from "../../assets/images/loginimage.png";
import CustomButton from "../../components/CustomButton";
import sampleUsers from "../../data/SampleUsers";
import Validation from "./loginvalidation";

const LoginScreen = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const user = sampleUsers.find(
        (u) =>
          (u.email.toLowerCase() === values.email.toLowerCase() ||
            u.username.toLowerCase() === values.email.toLowerCase()) &&
          u.password === values.password
      );

      if (user) {
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
        Alert.alert("Success", `Welcome ${user.username}!`);
        router.push("/home/landingpage"); // Make sure this matches your file name and path
      } else {
        Alert.alert("Login Failed", "Invalid email/username or password.");
      }
    } catch (error) {
      Alert.alert("Login Failed", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={LoginBackgroundImage}
        resizeMode="cover"
        className="flex-1"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="w-full max-w-sm">
              <View className="bg-gray-100/90 rounded-lg shadow-lg p-8 items-center">
                {/* Logo and Title inside the card */}
                <View className="flex-row items-center justify-center mb-4">
                  <Image
                    source={LogoImage}
                    className="w-14 h-14 mr-3"
                    resizeMode="contain"
                  />
                  <Text className="text-2xl font-bold text-[#012353] font-serif">
                    DigiAdhyann 360
                  </Text>
                </View>

                <Text className="text-sm text-gray-600 mb-3 text-center">
                  Login To Your Account
                </Text>

                {/* Email Input */}
                <View
                  className={`flex-row items-center bg-white px-4 py-2 mb-2 w-full border ${
                    focusedField === "email"
                      ? "border-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  <Icon
                    name="mail"
                    size={20}
                    color="gray"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    placeholder="Username/Email"
                    className="flex-1 text-base text-gray-800"
                    value={values.email}
                    onChangeText={(text) =>
                      setValues({ ...values, email: text })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-sm ml-1 mb-1">
                    {errors.email}
                  </Text>
                )}

                {/* Password Input */}
                <View
                  className={`flex-row items-center bg-white px-4 py-2 mb-2 w-full border ${
                    focusedField === "password"
                      ? "border-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  <Icon
                    name="lock"
                    size={20}
                    color="gray"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    placeholder="Enter Password"
                    className="flex-1 text-base text-gray-800"
                    value={values.password}
                    onChangeText={(text) =>
                      setValues({ ...values, password: text })
                    }
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm ml-1 mb-3">
                    {errors.password}
                  </Text>
                )}

                {/* Login Button */}
                <CustomButton
                  onPress={handleLogin}
                  loading={loading}
                  className="self-center mb-2"
                >
                  Login
                </CustomButton>

                {/* Sign Up Prompt */}
                <View className="flex-row justify-center mt-2">
                  <Text className="text-sm text-gray-600">
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/signup/signup")}>
                    <Text className="text-sm text-blue-600 font-semibold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
