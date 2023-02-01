import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
