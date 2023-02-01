import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default HomeScreen;
