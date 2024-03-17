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
  AllArticleContainer: ViewStyle;
  // Add the new styles for the modal here
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalArticleLine: ViewStyle;
  quantityInput: TextStyle;
  modalButtonContainer: ViewStyle;
  modalButton: ViewStyle;
}

const styles: Styles = {
  toursChooseLine: {
    display: 'flex',
    flexDirection: 'column', // Change to column to stack creches vertically
    width: scale(300),
    margin: moderateScale(10),
    borderRadius: moderateScale(10),
    border: {
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    backgroundColor: '#b0e0e6',
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
    padding: moderateScale(20),
  } as TextStyle,
  AllArticleContainer: {
    paddingTop: moderateScale(10),
    alignSelf: 'flex-start', // Align the container to the left
    paddingLeft: moderateScale(20), // Add left padding
    paddingBottom: moderateScale(20),
    maxHeight: moderateScale(400), // Set a maximum height for the container
    width: '100%', // Take full width of the container
  },   
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 0, 0.5)', // Green background with some transparency
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    width: scale(250), // Adjust the width as needed
    height: moderateScale(200), // Adjust the height to make it vertically smaller
    justifyContent: 'center', // Center the content vertically
  },
  modalArticleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  quantityInput: {
    width: scale(50),
    borderColor: '#D4A866',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(20),
  },
  modalButton: {
    backgroundColor: '#D4A866',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
  },
};


export default styles;
