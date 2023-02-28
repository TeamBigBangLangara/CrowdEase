import React from 'react'
import { Pressable, Image, StyleSheet } from 'react-native'

const IconButton = (props: any) => {
  return (
    <Pressable
      onPress={props.onClick}
      style={[styles.button]}>
      <Image source={props.iconPath} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center'
  }
})

export default IconButton
