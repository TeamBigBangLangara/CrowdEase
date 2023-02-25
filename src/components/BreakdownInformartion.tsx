import { Text, StyleSheet, View, Image } from 'react-native';

const BreakdownInformation = (props: { startTime: string; endTime: string; crowdNumber: number; iconPath: string}) => {

  return (
    <View style={styles.breakdownBox}>
    <Image source={{uri:props.iconPath}} />
    <Text style={styles.time}>{props.startTime}-{props.endTime}</Text>
    <Text style={styles.number}>{props.crowdNumber}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  breakdownBox: {
    width: 115,
    height: 89,
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  time: {
    color: '#E6E1E5',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center'
  },
  number: {
    color: '#FAFBFC',
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
    margin: 10
  }
})
export default BreakdownInformation