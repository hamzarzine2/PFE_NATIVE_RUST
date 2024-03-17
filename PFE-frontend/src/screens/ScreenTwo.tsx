import React from "react";
import { View, Text, Button } from "react-native";

const ScreenTwo: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [count, setCount] = React.useState(0);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Deuxieme ecran</Text>

      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
     
      <View>
        <Button title="Go to Home page" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default ScreenTwo;
