import { useState } from "react";
import { Alert, SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/CustomButton";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    // Handle sign-up logic here
    Alert.alert("Success", "You have signed up successfully!");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Sign Up</Text>
        <TextInput
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton onPress={handleSignUp} className="self-center mb-6">
          Sign Up
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;