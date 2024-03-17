import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/auth/RegisterScreen";
import Login from "../screens/auth/LoginScreen";
/*
stack navigator for authentication screens (login, register). 
only shown when user is not authenticated
register screen can navigate to login screen and vice versa
they can't be accessed when user is authenticated
they can't navigate to other screens
 */
const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default Auth;
