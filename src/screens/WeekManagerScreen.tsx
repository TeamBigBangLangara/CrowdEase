import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const WeekManager = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Week Manager Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default WeekManager;