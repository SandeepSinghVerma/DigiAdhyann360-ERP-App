// app/_layout.jsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import "../global.css"; // if you're using nativewind global CSS

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false, // disable default header if you're using custom headers
        }}
      />
    </Provider>
  );
}
