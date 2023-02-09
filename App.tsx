import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUpScreen';
import Login from './src/screens/LoginScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={SplashScreen} />
          <Stack.Screen name={'Home'} component={HomeScreen} />
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'SignUp'} component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
