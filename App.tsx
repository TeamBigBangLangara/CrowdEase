import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/auth';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    GoogleSignin.configure({
      webClientId:
        '259021060250-a486v22la0hut46k5f0r3rntoevh9unt.apps.googleusercontent.com',
    });
  }, []);

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={SplashScreen} />
          <Stack.Screen name={'Home'} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
