import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LocationScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Location Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default LocationScreen;