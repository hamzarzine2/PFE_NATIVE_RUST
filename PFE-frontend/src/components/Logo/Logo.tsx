import React from "react";
import { Image } from "react-native";
// this component can be used in any screen and can be customized
interface Props {
  height?: number;
  width?: number;
}

const Logo: React.FC<Props> = ({ height, width }) => (
  <Image
    source={require("../../../assets/Snappies-Logo.png")}
    style={{
      width,
      height,
      resizeMode: "contain",
      marginBottom: 20,
    }}
  />
);

export default Logo;
