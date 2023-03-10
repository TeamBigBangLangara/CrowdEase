import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import EventScreen from '../../screens/EventScreen';
import WeekManager from '../../screens/WeekManagerScreen';
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
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Map</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={WeekManager}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Report</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Events</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBottomTab;
