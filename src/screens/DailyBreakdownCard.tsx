import { View, StyleSheet, Text, Image } from 'react-native';

const DailyBreakdownCard = (props: { participants: number; percentage: number; musicQty: number; sportQty: number; showsQty: number; festivalsQty: number; businessQty: number; otherQty: number; }) => {
  const parent = {
    readings: [
      { value: props.musicQty, color: '#90EE90' },
      { value: props.sportQty, color: '##B687FF' },
      { value: props.showsQty, color: '#FFB9A1' },
      { value: props.festivalsQty, color: '#FFFA6E' },
      { value: props.businessQty, color: '##68B5DE' },
      { value: props.otherQty, color: '#938F99' },
    ],
  };
  const total = parent.readings.reduce((sum: number, item: any) => sum + item.value, 0);
  let currentPos = 0;
  let values = parent.readings && parent.readings.length && parent.readings.map(function (item: any, i: number) {
    if (item.value > 0) {
      const width = (item.value / total) * 100;
      const left = (currentPos / total) * 100;
      currentPos += item.value;
      return (
        <View style={[styles.bar, { left: `${left}%`, width: `${width}%`, backgroundColor: item.color }]} key={i}>
        </View>
      )
    }
  });

  return (
    <View style={styles.box}>
      <Text style={styles.participants}>{props.participants} participants</Text>
      <Text style={styles.infoPercentage}>{props.percentage}% less than last week</Text>
      <View style={styles.progressbar}>
        <View>
          {values}
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Music</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.musicQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#90EE90' }]}></View>
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Sport</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.sportQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#B687FF' }]}></View>
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Shows</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.showsQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#FFB9A1' }]}></View>
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Festivals</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.festivalsQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#FFFA6E' }]}></View>
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Business</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.businessQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#68B5DE' }]}></View>
        </View>
      </View>
      <View style={styles.infowrapper}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Other</Text>
        </View>
        <View>
          <Text style={styles.number}>{props.otherQty}</Text>
          <View style={[styles.sign,{ backgroundColor: '#938F99' }]}></View>
        </View>
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
    flexDirection: 'column',
    padding: 10
  },
  participants:{
    fontWeight: "500",
    fontSize: 20,
    color: '#E6E1E5',
  },
  infoPercentage:{
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
  },
  progressbar: {
    height: 22,
    backgroundColor: '#938F99',
    borderRadius: 22,
    position: 'relative',
    width: '90%',
    overflow: 'hidden',
    margin: 20,
  },
  bar: {
    height: 22,
    position: 'absolute',
    top: 0
  },
  infowrapper: {
    display: 'flex',
    flexDirection :'row',
    justifyContent: 'space-between'
  },
  name:{
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
    
  },
  sign: {
    width: 50,
    height: 6,
    borderRadius: 22,
  },
  number:{
    color: '#E6E1E5',
  }
})

export default DailyBreakdownCard