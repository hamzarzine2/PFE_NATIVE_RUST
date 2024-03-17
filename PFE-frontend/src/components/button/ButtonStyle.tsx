
import { scale, moderateScale } from 'react-native-size-matters';
import { ViewStyle, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#32CD32",
    borderRadius: moderateScale(20),
    padding: moderateScale(5), // Ajustez cette valeur selon votre besoin
    margin: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default styles;