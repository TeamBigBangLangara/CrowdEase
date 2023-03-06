import { Text, StyleSheet, View, Image } from 'react-native';

const ParticipantsByMeal = (props: {
  mealTime: string
  crowdNumber: number
  iconPath?: string
}) => {
  const renderTime = () => {
    switch (props.mealTime) {
      case 'morning':
        return '6am-12pm';
        break;
      case 'lunch':
        return '1pm-5pm';
        break;
      case 'dinner':
        return '6pm-10pm';
        break;
      default:
        return 'The specified meal is not correct';
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: props.iconPath, }} />
      <Text style={styles.time}>{renderTime()}</Text>
      <Text style={styles.number}>{props.crowdNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 115,
    height: 89,
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  time: {
    color: '#E6E1E5',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  number: {
    color: '#FAFBFC',
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
});
export default ParticipantsByMeal;
