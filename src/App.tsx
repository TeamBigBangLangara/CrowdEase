import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { QueryClient, QueryClientProvider } from "react-query";

import SignUp from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/LoginScreen';
import NavigationBottomTab from './components/navigation/NavigationBottomTab';
import LocationScreen from './screens/LocationScreen';
import { SafeAreaView } from "react-native";

export type AuthStackParams = {
  SplashScreen: undefined
  LoginScreen: undefined
  SignUpScreen: undefined
  LocationScreen: { emailParam: string, passwordParam: string }
  BottomTabs: undefined
}

export type MainStackParams = {
  HomeScreen: undefined
  ReportScreen: undefined
  SuggestionScreen: undefined
  EventScreen: undefined
}

export type TabParams = {
  MainStack: undefined
  MapScreen: undefined
  ReportStack: undefined
  EventsStack: undefined
}

const Stack = createNativeStackNavigator<AuthStackParams>();

const queryClient = new QueryClient();


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
      webClientId: '259021060250-a486v22la0hut46k5f0r3rntoevh9unt.apps.googleusercontent.com',
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {!isLoggedIn && (
          <Stack.Navigator initialRouteName={'SplashScreen'}>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
            <Stack.Screen name={'LoginScreen'} component={Login} />
            <Stack.Screen name={'SignUpScreen'} component={SignUp} />
            <Stack.Screen name={'LocationScreen'} component={LocationScreen} />
          </Stack.Navigator>
        )}
        {isLoggedIn && (
          <Stack.Navigator screenOptions={{ headerShown: false,}}>
            <Stack.Screen name={'BottomTabs'} component={NavigationBottomTab}
          />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
