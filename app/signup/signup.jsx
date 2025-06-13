import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

const SignupScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-10 left-5 p-2"
        onPress={() => router.back()}
      >
        <Icon name="arrow-left" size={24} color="#012353" />
      </TouchableOpacity>

      <Text className="text-xl font-bold">Signup Screen</Text>
    </View>
  );
};

export default SignupScreen;