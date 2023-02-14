import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Bookmark Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default BookmarkScreen;