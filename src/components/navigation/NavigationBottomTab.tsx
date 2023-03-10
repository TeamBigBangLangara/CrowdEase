import React, { useEffect } from 'react';
import { Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import EventScreen from '../../screens/EventScreen';
import WeekManager from '../../screens/WeekManagerScreen';
import { colors } from '../../styles/colors';
import { requestUsers } from '../../api/bigBangAPI/users';

const Tab = createBottomTabNavigator();

const NavigationBottomTab = () => {
  const loadItems = async () => {
    //const response = await getUsers();
    const response = await requestUsers();
    console.log(response); //For Demo, to be removed.

};

useEffect(() => {
  loadItems();
}, []);

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.netural.surfaceBlack,
        },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: colors.netural.surfaceBlack, },
        tabBarActiveTintColor: colors.primary.primaryPurpleDark,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/HomeActive.png') : require('../../assets/icons/navIcons/Home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused, }) => (
              <Image source={focused ? require('../../assets/icons/navIcons/MapActive.png') : require('../../assets/icons/navIcons/Map.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={WeekManager}
        options={{
          tabBarIcon: ({ focused, }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/ReportActive.png') : require('../../assets/icons/navIcons/Report.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused, }) => (
            <Image source={focused ? require('../../assets/icons/navIcons/EventActive.png') : require('../../assets/icons/navIcons/Event.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default NavigationBottomTab;
