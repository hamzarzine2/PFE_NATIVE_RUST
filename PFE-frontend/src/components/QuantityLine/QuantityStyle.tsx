import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#b0e0e6',
      borderRadius: 10,
      margin: 10,
      padding: 10
    },
    circle: {
      backgroundColor: '#D4A866',
      borderRadius: 15,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    circleText:{
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15
    }
    ,
    text: {
      marginLeft: 10,
      fontSize: 18
    }
  });

  export default styles;