import { Text, StyleSheet, View } from 'react-native';

const DailyMajorEvent = (props:{eventName: string; participantsQty: number; percentage: number; category: string;}) => {
  const progressBarWidth = `${props.percentage}%`;
return(
<View style={styles.box}>
  <View style={styles.nameWrapper}>
    <Text style={styles.eventName}>{props.eventName}</Text>
    <Text style={styles.participants}>{props.participantsQty} participants</Text>
  </View>
  <Text style={styles.info}>{props.percentage}% over {props.category} category</Text>
  <View style={styles.progressBar}>
  <View style={[styles.absoluteFill, { width: progressBarWidth }]} />
  </View>
  <Text style={styles.text}>Get ready for your inventory, staff and, your online orders.</Text>

</View>
)
}

const styles = StyleSheet.create({
  box: {
    width: '90%',
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    padding: 5
  },
  nameWrapper:{
    margin: 10
  },
  eventName:{
    fontWeight: "500",
    fontSize: 20,
    color: '#E6E1E5',
  },
  participants:{
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
  },
  info:{
    fontWeight: "400",
    fontSize: 14,
    color: '#E6E1E5',
  },
  progressBar:{
    width: 337,
    height: 22,
    backgroundColor: '#938F99',
    borderRadius: 22,
  },
  absoluteFill:{
    height: 22,
    backgroundColor: '#90EE90',
    borderRadius: 22,
  },
  text:{
    fontWeight: "400",
    fontSize: 12,
    color: '#E6E1E5',
  }
})

export default DailyMajorEvent