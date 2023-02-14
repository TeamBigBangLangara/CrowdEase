import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SuggestionScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Suggestion Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default SuggestionScreen;