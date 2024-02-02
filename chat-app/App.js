import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import RecentChat from "./Screens/RecentChat";
import ChatScreen from "./Screens/ChatScreen";
import { AuthProvider } from "./context/authContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <AuthProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RecentChat" component={RecentChat} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />

        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>

    </>
  );
}
