import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SingleEventScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>SingleEvent Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default SingleEventScreen;