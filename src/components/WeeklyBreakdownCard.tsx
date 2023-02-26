import { View, StyleSheet, Text } from 'react-native';

const WeeklyBreakdownCard = (props: { date: string; eventNumber: number; participantsQty: number; }) => {
  return (
    <View style={styles.box}>
      <View style={styles.infoWrapper} >
        <Text style={styles.header}>Date</Text>
        <Text style={styles.info}>{props.date}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.header}>Event Number</Text>
        <Text style={styles.info}>{props.eventNumber}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.header}>Event Participants</Text>
        <Text style={styles.info}>{props.participantsQty}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '90%',
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    fontWeight: "500",
    fontSize: 12,
    color: '#E6E1E5',
  },
  info: { 
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
  }
})

export default WeeklyBreakdownCard