// deliverer stack navigator
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DelivererChooseScreen from "../screens/deliverer/DelivererChooseScreen";
import DelivererContentScreen from "../screens/deliverer/DelivererContentScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import DelivererTour from "../screens/deliverer/DelivererTour";
import DelivererToursScreen from "../screens/deliverer/DelivererToursScreen";
const DelivererStack = createStackNavigator();

/*
DelivererStack is a stack navigator, which means it will be used to navigate between screens.
DelivererStack will be shown when user is authenticated and is not admin.
*/
const Deliverer: React.FC = () => {
  return (
    <DelivererStack.Navigator>
      <DelivererStack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <DelivererStack.Screen
        name="DelivererToursScreen"
        component={DelivererToursScreen}
      />
      <DelivererStack.Screen name="DelivererTour" component={DelivererTour} options={{headerShown : false}}/>
      <DelivererStack.Screen
        name="DelivererChoose"
        component={DelivererChooseScreen}
      />
      <DelivererStack.Screen
        name="DelivererContent"
        component={DelivererContentScreen}
        options={{
          headerTitle: "Contenu de la tournée",
          headerBackTitle: "Retour",
        }}
      />
     
    </DelivererStack.Navigator>
  );
};

export default Deliverer;
