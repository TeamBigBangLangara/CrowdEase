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
import WeekManagerScreen from "./screens/WeekManagerScreen";
import SuggestionScreen from "./screens/SuggestionScreen";
import EventScreen from "./screens/EventScreen";
import HomeScreen from "./screens/HomeScreen";
import EventDetailsScreen from './screens/EventDetailsScreen';
import { Event } from 'types/types';

export type AuthStackParams = {
  SplashScreen: undefined
  LoginScreen: undefined
  SignUpScreen: undefined
  LocationScreen: { emailParam: string, passwordParam: string, userName: string }
  BottomTabs: undefined
}

export type MainStackParams = {
  HomeScreen: undefined
  WeekManagerScreen: undefined
  SuggestionScreen: undefined
  EventScreen: undefined
  EventDetailsScreen: {eventId: string};

}

export type TabParams = {
  MainStack: undefined
  MapScreen: undefined
  ReportStack: undefined
  EventsStack: undefined
}

const Stack = createNativeStackNavigator<AuthStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();


export const HomeStack = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false, }}>
      <MainStack.Screen name={"HomeScreen"} component={HomeScreen} />
      <MainStack.Screen name={"WeekManagerScreen"} component={WeekManagerScreen} />
      <MainStack.Screen name={"SuggestionScreen"} component={SuggestionScreen} />
      <MainStack.Screen name={"EventScreen"} component={EventScreen} />
      <MainStack.Screen name={"EventDetailsScreen"} component={EventDetailsScreen} />
    </MainStack.Navigator>
  );
};

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
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
              <Stack.Screen name={'BottomTabs'} component={NavigationBottomTab} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
