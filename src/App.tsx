import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "react-query";

import SignUp from "./screens/SignUpScreen";
import LaunchScreen from "./screens/LaunchScreen";
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/LoginScreen";
import NavigationBottomTab from "./components/navigation/NavigationBottomTab";
import LocationScreen from "./screens/LocationScreen";
import { SafeAreaView, StatusBar } from "react-native";
import WeekManagerScreen from "./screens/WeekManagerScreen";
import SuggestionScreen from "./screens/SuggestionScreen";
import EventScreen from "./screens/EventScreen";
import HomeScreen from "./screens/HomeScreen";
import PastEventScreen from "./screens/PastEventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import MapScreen from "./screens/MapScreen";

export type AuthStackParams = {
  SplashScreen: undefined
  LaunchScreen: undefined
  LoginScreen: undefined
  SignUpScreen: undefined
  LocationScreen: { emailParam: string, passwordParam: string, userName: string }
  BottomTabs: undefined
}

export type MainStackParams = {
  HomeScreen: {isDarkMode: boolean;}
  WeekManagerScreen: undefined
  SuggestionScreen: undefined
  EventDetailsScreen: {eventId: string};
  PastEventScreen: undefined
  ProfileScreen: {
    isDarkMode: boolean;
    toggleDarkMode: (value: boolean) => void;
  }
}

export type EventsStackParams = {
  EventScreen: undefined
  EventDetailsScreen: {eventId: string};
}

export type ReportStackParams =  {
  WeekManagerScreen: undefined
  SuggestionScreen: undefined
}

export type MapStackParams = {
  MapScreen: undefined;
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
const EventsStack = createNativeStackNavigator<EventsStackParams>();
const ReportStack = createNativeStackNavigator<ReportStackParams>();
const MapStack = createNativeStackNavigator<MapStackParams>();

export const HomeStack = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false,}}>
      <MainStack.Screen name={"HomeScreen"} component={HomeScreen} initialParams={{isDarkMode}}/>
      <MainStack.Screen name={"WeekManagerScreen"} component={WeekManagerScreen}/>
      <MainStack.Screen name={"PastEventScreen"} component={PastEventScreen}/>
      <MainStack.Screen name={"ProfileScreen"} component={ProfileScreen} initialParams={{isDarkMode, toggleDarkMode}}/>
      <MainStack.Screen name={"EventDetailsScreen"} component={EventDetailsScreen} />
      <MainStack.Screen name={"SuggestionScreen"} component={SuggestionScreen} />
    </MainStack.Navigator>
  );
};

export const EventStack = () => {
  return (
    <EventsStack.Navigator screenOptions={{headerShown: false,}}>
      <EventsStack.Screen name={"EventScreen"} component={EventScreen}/>
      <EventsStack.Screen name={"EventDetailsScreen"} component={EventDetailsScreen} />
    </EventsStack.Navigator>
  );
};


export const ReportsStack = () => {
  return (
    <ReportStack.Navigator screenOptions={{headerShown: false,}}>
      <ReportStack.Screen name={"WeekManagerScreen"} component={WeekManagerScreen}/>
      <ReportStack.Screen name={"SuggestionScreen"} component={SuggestionScreen}/>
    </ReportStack.Navigator>
  );
};

export const MapsStack = () => {
  return (
    <MapStack.Navigator screenOptions={{headerShown: false,}}>
      <MapStack.Screen name={"MapScreen"} component={MapScreen}/>
      <MapStack.Screen name={"EventDetailsScreen"} component={EventDetailsScreen} />
    </MapStack.Navigator>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', }}>
      <StatusBar barStyle="light-content"/>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {!isLoggedIn && (
            <Stack.Navigator initialRouteName={'SplashScreen'}
            screenOptions={{headerShown: false,}}>
              <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
              <Stack.Screen name={'LaunchScreen'} component={LaunchScreen} />
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
