import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
