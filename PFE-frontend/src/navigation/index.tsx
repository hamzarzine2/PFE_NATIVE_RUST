import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { NavigationContainer } from "@react-navigation/native";
import Auth from "./AuthStack";
import Admin from "./AdminStack";
import Deliverer from "./DelivererStack";


export default () => {
  const { isAuthenticated, isAdmin } = useContext(UserContext);
  return (
    <NavigationContainer>
      {!isAuthenticated && <Auth />}

      {isAuthenticated && !isAdmin && <Deliverer />}
      {isAuthenticated && isAdmin && <Admin />}
      
    </NavigationContainer>
  );
};
