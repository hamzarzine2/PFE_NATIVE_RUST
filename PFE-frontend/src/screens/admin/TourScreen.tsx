import React, { useState, useEffect } from "react";
import { View, Text, Button, RefreshControl, ScrollView } from "react-native";
import { Tour } from "../../models/tour";
import {
  getAllTours as getAllToursApi,
  getAllToursToday as getAllToursTodayApi,
  getToursByDate as getToursByDateApi,
} from "../../services/toursManagementService";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import TourComponent from "./components/Tour";

const ToursScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const date_formated = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        const allTours = await getToursByDateApi(date_formated);
        if (allTours=== undefined) {
         
          return;
        }
        console.log("Tours:", allTours);
        
        setTours(allTours); 
      } catch (error) {
        console.error("Erreur lors du chargement des tours:", error);
      }
    };

    fetchTours();
  }, [date, refreshing]);

 

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 60 }}>
        Tournées du {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
      </Text>
     
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16}}>
            Choisissez une date : 
          </Text>

          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            //@ts-ignore
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        </View>
        <ScrollView
        style={{ padding: 10, marginTop: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {tours.map((tour, index) => (
          <TourComponent key={index} navigation={navigation} tour={tour} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ToursScreen;
