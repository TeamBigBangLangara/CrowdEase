import { View, StyleSheet, Text } from 'react-native'

const ReportCard = (props: { date: string; eventNumber: number; participantsQty: number }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.info}>{props.date}</Text>
      </View>
      <View>
        <Text style={styles.header}>Event Number</Text>
        <Text style={styles.info}>{props.eventNumber}</Text>
      </View>
      <View>
        <Text style={styles.header}>Event Participants</Text>
        <Text style={styles.info}>{props.participantsQty}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginHorizontal: 12
  },
  header: {
    fontWeight: '500',
    fontSize: 12,
    color: '#E6E1E5',
    textAlign: 'center'
  },
  info: {
    fontWeight: '500',
    fontSize: 16,
    color: '#E6E1E5'
  }
})

export default ReportCard
