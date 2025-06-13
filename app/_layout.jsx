import { Stack } from "expo-router";
import "../global.css"; // if you're using nativewind global CSS

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // disable default header if you're using custom headers
      }}
    />
  );
}