import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../reduxtoolkit/store"; // Ensure this path is correct

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ title: "Exercise Details" }} />
      </Stack>
    </Provider>
  );
}
