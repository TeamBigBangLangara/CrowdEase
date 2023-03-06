import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EventScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Event Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventScreen;
