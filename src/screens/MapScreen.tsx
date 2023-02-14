import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default MapScreen;