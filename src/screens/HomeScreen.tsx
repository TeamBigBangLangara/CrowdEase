import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { signOut } from '../auth/user';
import { MainStackNavigationProps } from '../types/navigationTypes';

const HomeScreen = ({ navigation, }: MainStackNavigationProps<'HomeScreen'>) => {
  return (
    <View style={styles.wrapper}>
      <Text>Home Screen</Text>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
      <MapView
        style={{height: 100, width: 100,}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
