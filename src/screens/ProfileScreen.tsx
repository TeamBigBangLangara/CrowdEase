import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
  },
});

export default ProfileScreen;