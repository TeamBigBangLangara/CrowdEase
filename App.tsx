import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUpScreen';
import Login from './src/screens/LoginScreen';

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

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen name={'Splash'} component={SplashScreen} />
            <Stack.Screen name={'Home'} component={HomeScreen} />
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Sign Up'} component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen name={'Splash'} component={SplashScreen} />
            <Stack.Screen name={'Home'} component={HomeScreen} />
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Sign Up'} component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
};

export default App;
