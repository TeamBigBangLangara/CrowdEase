import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Bookmark Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookmarkScreen;
