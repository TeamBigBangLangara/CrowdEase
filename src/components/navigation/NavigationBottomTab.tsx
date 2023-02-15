import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import EventScreen from '../../screens/EventScreen';
import WeekManager from '../../screens/WeekManagerScreen';

const Tab = createBottomTabNavigator();
const NavigationBottomTab = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options= {{
        tabBarIcon: () => (
          <View>
            {/* <Image source={require('')}/> */}
            <Text>
              Home
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Map" component={MapScreen} options= {{
        tabBarIcon: () => (
          <View>
            <Text>
              Map
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Report" component={WeekManager} options= {{
        tabBarIcon: () => (
          <View>
            <Text>
              Report
            </Text>
          </View>
        )
      }}/>
      <Tab.Screen name="Events" component={EventScreen} options= {{
        tabBarIcon: () => (
          <View>
            <Text>
              Events
            </Text>
          </View>
        )
      }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'gray',
  },
});

export default NavigationBottomTab
