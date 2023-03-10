import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import EventScreen from '../../screens/EventScreen';
import WeekManager from '../../screens/WeekManagerScreen';
import { colors } from '../../styles/colors';
import { fontFamily, fontWeightSubtitle2, fontSize } from '../../styles/fonts'
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const NavigationBottomTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.netural.surfaceBlack },
        tabBarActiveTintColor: colors.primary.primaryPurpleDark,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/HomeActive.png') : require('../../assets/icons/navIcons/Home.png')} />
          )
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
              <Image source={focused ? require('../../assets/icons/navIcons/MapActive.png') : require('../../assets/icons/navIcons/Map.png')} />
          )
        }}
      />
      <Tab.Screen
        name="Report"
        component={WeekManager}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/ReportActive.png') : require('../../assets/icons/navIcons/Report.png')} />
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/EventActive.png') : require('../../assets/icons/navIcons/Event.png')} />
          )
        }}
      />
    </Tab.Navigator>
  );
};


export default NavigationBottomTab;
