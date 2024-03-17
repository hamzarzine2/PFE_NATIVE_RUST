import React from "react";
import { ScrollView , StyleSheet} from "react-native";
import CrecheLine from "../CrecheLine/CrecheLine";
import { Client } from "../../models/Client";

interface Props {
  creches: Client[];
}

const CrecheComponent: React.FC<Props> = ({
  creches,
}) => {
  return (
    <ScrollView style={styles.creche}>
      {creches.map((creche, index) => (
        <CrecheLine
          creche={creche}
          
          key={index}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  creche: {
    padding: 20,
  },
});
export default CrecheComponent;
