import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CustomizationScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Customization Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default CustomizationScreen;