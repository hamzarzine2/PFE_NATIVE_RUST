import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "../contexts/UserContext";
import ClientsScreen from "../screens/clients/ClientsScreen";
import MemberManagement from "../screens/admin/MemberManagementScreen";
//import DelivererScreen from "../screens/deliverer/DelivererChooseScreen";

import ItemManagementScreen from "../screens/admin/ItemManagementScreen";
import DelivererChooseScreen from "../screens/deliverer/DelivererChooseScreen";
import DelivererTour from "../screens/deliverer/DelivererTour";
import DelivererToursScreen from "../screens/deliverer/DelivererToursScreen";
import Profile from "../screens/Profile/Profile";
const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const { isAuthenticated, isAdmin } = useContext(UserContext);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && isAdmin && (
        <>
          <Tab.Screen name="Membres" component={MemberManagement} />
          <Tab.Screen name="Clients" component={ClientsScreen} />
          <Tab.Screen
            name="ItemManagement"
            component={ItemManagementScreen}
            options={{
              tabBarLabel: "Articles",
            }}
          />
        </>
      )}
      {isAuthenticated && !isAdmin && (
        <Tab.Screen name="DelivererToursScreen" component={DelivererToursScreen} options={{
          tabBarLabel: "Mes livraisons",
        }} />
      )}
      {isAuthenticated && (
        <Tab.Screen name="Profile" component={Profile}  options={{
          tabBarLabel: "Profil",
        }}/>        
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
