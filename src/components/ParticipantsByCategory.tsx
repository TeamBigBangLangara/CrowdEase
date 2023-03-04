import { View, StyleSheet, Text, Image } from 'react-native'

const ParticipantsByCategory = (props: {
  participants: number
  percentage: number
  musicQty: number
  sportQty: number
  showsQty: number
  festivalsQty: number
  businessQty: number
  otherQty: number
}) => {
  const parent = {
    readings: [
      { value: props.musicQty, color: '#90EE90' },
      { value: props.sportQty, color: '##B687FF' },
      { value: props.showsQty, color: '#FFB9A1' },
      { value: props.festivalsQty, color: '#FFFA6E' },
      { value: props.businessQty, color: '##68B5DE' },
      { value: props.otherQty, color: '#938F99' }
    ]
  }

  // Calculate the total value of all readings
  const total = parent.readings.reduce((sum: number, item: any) => sum + item.value, 0)

  // Initialize the current position to 0
  let currentPos = 0

  // Map over the readings array to create a list of bar graph components
  let values =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item: any, i: number) {
      // Check if the reading value is greater than 0
      if (item.value > 0) {
        // Calculate the width and position of the bar graph
        const width = (item.value / total) * 100
        const left = (currentPos / total) * 100

        // Increment the current position by the value of the current reading
        currentPos += item.value

        // Return a View component representing the current bar graph
        return (
          <View
            style={[
              styles.bar,
              { left: `${left}%`, width: `${width}%`, backgroundColor: item.color }
            ]}
            key={i}></View>
        )
      }
    })

  return (
    <View style={styles.container}>
      <Text style={styles.participants}>{props.participants} participants</Text>
      <Text style={styles.infoPercentage}>{props.percentage}% less than last week</Text>
      <View style={styles.progressbar}>
        <View>{values}</View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Music</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#90EE90' }]}></View>
          <Text style={styles.percentage}>{props.musicQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Sport</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#B687FF' }]}></View>
          <Text style={styles.percentage}>{props.sportQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Shows</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#FFB9A1' }]}></View>
          <Text style={styles.percentage}>{props.showsQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Festivals</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#FFFA6E' }]}></View>
          <Text style={styles.percentage}>{props.festivalsQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Business</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#68B5DE' }]}></View>
          <Text style={styles.percentage}>{props.businessQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View>
          {/* <Image source={require('')} /> */}
          <Text style={styles.name}>Other</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: '#938F99' }]}></View>
          <Text style={styles.percentage}>{props.otherQty}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: '#121214',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  participants: {
    fontWeight: '500',
    fontSize: 20,
    color: '#E6E1E5'
  },
  infoPercentage: {
    fontWeight: '500',
    fontSize: 16,
    color: '#E6E1E5'
  },
  progressbar: {
    height: 22,
    backgroundColor: '#938F99',
    borderRadius: 22,
    position: 'relative',
    width: '90%',
    overflow: 'hidden',
    margin: 20
  },
  bar: {
    height: 22,
    position: 'absolute',
    top: 0
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    color: '#E6E1E5'
  },
  sign: {
    width: 50,
    height: 6,
    borderRadius: 22
  },
  percentage: {
    color: '#E6E1E5',
    textAlign: 'center'
  }
})

export default ParticipantsByCategory
