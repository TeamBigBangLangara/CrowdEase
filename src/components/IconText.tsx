import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const IconText = (props: { icon: any; text: string }) => {
  return (
    <View style={styles.generalWrapper}>
      <View style={styles.iconsWrapper}>
        <Image source={props.icon} />
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

//Style
const styles = StyleSheet.create({
  generalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#FAFBFC',
    fontSize: 14,
    lineHeight: 18
  },
  iconsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    marginRight: 5
  },
})

export default IconText
