import React from 'react';
import { View,Button,ViewStyle } from 'react-native';
import styles from './ButtonStyle';

interface ButtonProps {
    valueString: string;
    method: () => void;
  }

const ButtonChoose:React.FC<ButtonProps>= ({  valueString, method }) => {
  

  return (
    <View style={styles.button }>
      <Button title={valueString} onPress={method} color="#FFFFFF" />
    </View>
  );
};


export default ButtonChoose;
