import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const IconText = (props: { icon: any; text: string }) => {
  return (
    <View style={styles.container}>
      <Image source={props.icon} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4
  },
  text: {
    color: '#FAFBFC',
    fontSize: 14,
    lineHeight: 18
  }
})

export default IconText
