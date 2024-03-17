import React from "react";
import { View, Button, Linking, Image, TouchableOpacity } from "react-native";

const OpenMapButton = () => {
  const openGoogleMap = () => {
    // Replace the latitude and longitude with the coordinates you want to open on the map
    const latitude = 50.8498781729962;
    const longitude = 4.453638364267555;
    const label = "Haute Ecole Leonard de Vinci";

    // Create a URL with the specified coordinates and label
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&label=${label}`;

    // Open the URL in the default map application
    Linking.openURL(mapUrl);
  };

  return (
    <TouchableOpacity onPress={openGoogleMap}>
      <Image
        source={require("../../../assets/googlemaps.png")}
        style={{
          height: 20,
          width: 20,
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

export default OpenMapButton;
