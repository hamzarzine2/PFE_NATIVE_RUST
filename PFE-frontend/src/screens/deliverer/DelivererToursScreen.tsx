import React from "react";
import { useContext, useEffect, useState } from "react";
import { getTourByDelivererId } from "../../services/toursManagementService";
import { UserContext } from "../../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";
import DelivererTour from "./DelivererTour";
import DelivererChooseScreen from "./DelivererChooseScreen";

const DelivererToursScreen : React.FC<{navigation?: any}> = ({ navigation }) => {
  const [hasTour, setHasTour] = useState(false);
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const user_id = user?.user_id as number;
  
  const fetchTour = async () => {
    const fetchedTour = await getTourByDelivererId(user_id);
    console.log(" fetchedTour", { fetchedTour });
    
    setHasTour(fetchedTour !== undefined);
  };

  fetchTour();
    
  return (
    <>
      {hasTour ? 
        <DelivererTour navigation={navigation} />
       : 
        <DelivererChooseScreen navigation={navigation} />
      }
    </>
  );
}

export default DelivererToursScreen;