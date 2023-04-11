import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventStack, HomeStack, MapsStack, ReportsStack } from "../../App";
import { colors } from "../../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle2 } from "../../styles/fonts";
import GradientText from "../GradientText";
import { getToken } from "../../auth/user";
import { storage } from "../../store/mmkv";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const NavigationBottomTab = () => {

  useEffect (()=>{
    getToken();
  }, []);
  const [isDark, setIsDark] = useState(storage.getBoolean("isDark")); // use state to store isDark value

  useFocusEffect(() => { // update isDark value when the screen is focused
    setIsDark(storage.getBoolean("isDark"));
  });

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: isDark ? colors.neutral.surfaceBlack : colors.neutral.surfaceWhite, height: 60, borderTopWidth: 2, borderTopColor: colors.neutral.outlineGrey, },
        tabBarActiveTintColor:colors.primary.primaryPurpleDark,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
              <Image source={focused ? require('../../assets/icons/navIcons/HomeActive.png') : 
              isDark ? require('../../assets/icons/navIcons/Home.png') : require('../../assets/icons/lightMode/home.png')} />
              {focused ?
                <GradientText
                  text={'Home'}
                /> :
                <Text style={[styles.label, isDark ? styles.inactiveLabel : styles.inactiveLabelLight]}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapsStack}
        options={{
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
            <Image source={focused ? require('../../assets/icons/navIcons/MapActive.png') :
            isDark ? require('../../assets/icons/navIcons/Map.png') : require('../../assets/icons/lightMode/map.png')} />
            {focused ?
              <GradientText
                text={'Map'}
              /> :
              <Text style={[styles.label, isDark ? styles.inactiveLabel : styles.inactiveLabelLight]}>Map</Text>}
          </View>          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportsStack}
        options={{
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
            <Image source={focused ? require('../../assets/icons/navIcons/ReportActive.png') :
            isDark ? require('../../assets/icons/navIcons/Report.png') : require('../../assets/icons/lightMode/report.png')} />
            {focused ?
              <GradientText
                text={'Report'}
              /> :
              <Text style={[styles.label, isDark ? styles.inactiveLabel : styles.inactiveLabelLight]}>Report</Text>}
          </View>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
            <Image source={focused ? require('../../assets/icons/navIcons/EventActive.png') :
            isDark? require('../../assets/icons/navIcons/Event.png') : require('../../assets/icons/lightMode/event.png')} />
            {focused ?
              <GradientText
                text={'Events'}
               /> :
              <Text style={[styles.label , isDark ? styles.inactiveLabel : styles.inactiveLabelLight]}>Events</Text>}
          </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    fontWeight: fontWeightSubtitle2,
    marginBottom: 5,
  },
  inactiveLabel: {
    color: colors.neutral.surfaceWhite,
  },
  inactiveLabelLight: {
    color: colors.neutral.surfaceBlack,
  },
});

export default NavigationBottomTab;
