import React from 'react';
import { Text, Pressable, GestureResponderEvent, StyleSheet } from 'react-native';

const PlaceNameHere = (props: {
  onPress: (event: GestureResponderEvent) => void
  label: string
}) => {
  return console.log('Test');
};

//Style
const styles = StyleSheet.create({});

export default PlaceNameHere;
