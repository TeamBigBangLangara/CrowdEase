import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { firebase } from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import SignUp from './screens/SignUpScreen'
import SplashScreen from './screens/SplashScreen'
import Login from './screens/LoginScreen'

import NavigationBottomTab from './components/navigation/NavigationBottomTab'

export type MainStackParams = {
  HomeScreen: undefined
}

export type TabParams = {
  MainStack: undefined
  MapScreen: undefined
  ReportStack: undefined
  EventsStack: undefined
}

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })

    GoogleSignin.configure({
      webClientId: '259021060250-a486v22la0hut46k5f0r3rntoevh9unt.apps.googleusercontent.com'
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {!isLoggedIn && (
          <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen name={'Splash'} component={SplashScreen} />
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Sign Up'} component={SignUp} />
          </Stack.Navigator>
        )}
        {isLoggedIn && (
          <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'BottomTabs'} component={NavigationBottomTab} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App