import { scale, moderateScale } from 'react-native-size-matters';
import { ViewStyle, TextStyle } from 'react-native';

interface Styles {
    toursChooseLine: ViewStyle & {
      width: number;
      height?: number;
      margin: number;
      borderRadius: number;
      border: {
        borderColor: string;
        borderWidth: number;
      };
      shadow: {
        shadowColor: string;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      backgroundColor: string;
    };
    titleContainer: ViewStyle;
    text: TextStyle;
    crecheContainer: ViewStyle;
    crecheLine: ViewStyle;
  }
  
  const styles: Styles = {
    toursChooseLine: {
      display: 'flex',
      flexDirection: 'column', // Change to column to stack creches vertically
      width: scale(300),
      margin: moderateScale(10),
      borderRadius: moderateScale(10),
      border: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      backgroundColor: "#b0e0e6",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: {
      flexDirection: 'row', // Align title and button horizontally
      alignItems: 'center', // Align items in a row
      justifyContent: 'space-between', // Distribute items evenly
      width: '100%', // Take full width of the container
    },
    text: {
      color: '#D4A866',
      paddingLeft: moderateScale(10),
      fontSize: moderateScale(25),
      fontWeight: 'bold',
    },
      crecheContainer: {
      paddingTop: moderateScale(10),
      alignSelf: 'flex-start', // Align the container to the left
      paddingLeft: moderateScale(20), // Add left padding
      paddingBottom: moderateScale(20),
      maxHeight: moderateScale(100), // Set a maximum height for the container
      width: '100%', // Take full width of the container
    },
    crecheLine: {
      color: '#D4A866',
      fontSize: moderateScale(20),
      paddingBottom: moderateScale(5),
    } as TextStyle
  };

  export default styles;