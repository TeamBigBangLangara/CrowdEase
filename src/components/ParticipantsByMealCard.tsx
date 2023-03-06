import { Text, StyleSheet, View, Image } from 'react-native';
import IconText from "./IconText";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { margin } from "../styles/basic";

const ParticipantsByMeal = (props: {
  mealTime: string
  crowdNumber: number
  iconPath?: string
}) => {
  const renderLabelWithIcon = () => {
    switch (props.mealTime) {
      case 'morning':
        return (
          <View>
            <IconText icon={require('../assets/morning.png')} text={'6am-12pm'} style={styles.icon}/>
          </View>
        );
        case 'lunch':
        return (
          <View>
            <IconText icon={require('../assets/lunch.png')} text={'1pm-5pm'} style={styles.icon}/>
          </View>
        );
        case 'dinner':
        return (
          <View>
            <IconText icon={require('../assets/lunch.png')} text={'6pm-10pm'} style={styles.icon}/>
          </View>
        );
      default:
        return 'The specified meal is not correct';
    }
  };

  return (
    <View style={styles.container}>
      {renderLabelWithIcon()}
      <Text style={styles.number}>{props.crowdNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 115,
    height: 89,
    backgroundColor: colors.netural.surfaceBlack,
    borderRadius: 12,
    display: 'flex',
   },
  number: {
    color: colors.netural.backgroundWhite,
    fontWeight: fontWeightSubtitle,
    fontSize: 22,
    textAlign: 'center',
  },
  icon: {
    alignItems: "center",
  },
});
export default ParticipantsByMeal;
