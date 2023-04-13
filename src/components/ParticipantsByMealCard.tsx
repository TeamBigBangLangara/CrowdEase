import { Text, StyleSheet, View, Image } from 'react-native';
import IconText from "./IconText";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { margin } from "../styles/basic";

const ParticipantsByMeal = (props: {
  mealTime: string
  crowdNumber: number
  isDark?: boolean
}) => {
  const renderLabelWithIcon = () => {
    switch (props.mealTime) {
      case 'morning':
        return (
          <View>
            <IconText icon={props.isDark ? require('../assets/icons/morning.png') : require('../assets/icons/lightMode/morning.png')} text={'6am-12pm'} 
            style={styles.icon} isDark={props.isDark}/>
          </View>
        );
        case 'lunch':
        return (
          <View>
            <IconText icon={props.isDark ? require('../assets/icons/lunch.png') : require('../assets/icons/lightMode/evening.png')} text={'1pm-5pm'} 
            style={styles.icon} isDark={props.isDark}/>
          </View>
        );
        case 'dinner':
        return (
          <View>
            <IconText icon={props.isDark ? require('../assets/icons/dinner.png') : require('../assets/icons/lightMode/dinner.png')} text={'6pm-10pm'} 
            style={styles.icon} isDark={props.isDark}/>
          </View>
        );
      default:
        return 'The specified meal is not correct';
    }
  };

  return (
    <View style={props.isDark ? styles.container : styles.containerLight}>
      {renderLabelWithIcon()}
      <Text style={props.isDark ? styles.number: styles.numberLight}>{props.crowdNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'space-evenly',
    width: 115,
    height: 89,
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: 12,
    display: 'flex',
    
   },
  containerLight: {
    alignItems: "center",
    justifyContent: 'space-evenly',
    width: 115,
    height: 89,
    backgroundColor: colors.neutral.surfaceWhite,
    borderRadius: 12,
    display: 'flex',
    
   },
  number: {
    color: colors.neutral.backgroundWhite,
    fontWeight: fontWeightSubtitle,
    fontSize: 22,
    textAlign: 'center',
    
  },
  numberLight: {
    color: colors.neutral.surfaceBlack,
    fontWeight: fontWeightSubtitle,
    fontSize: 22,
    textAlign: 'center',
    
  },
  icon: {
    alignItems: "center",
    justifyContent: 'center',
    
  },
});
export default ParticipantsByMeal;
