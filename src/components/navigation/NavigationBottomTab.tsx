import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventStack, HomeStack, MapsStack, ReportsStack } from "../../App";
import { colors } from "../../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle2 } from "../../styles/fonts";
import GradientText from "../GradientText";
import { useEffect } from "react";
import { getToken } from "../../auth/user";

const Tab = createBottomTabNavigator();

const NavigationBottomTab = () => {

  useEffect (()=>{
    getToken();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.neutral.surfaceBlack, height: 60, borderTopWidth: 2, borderTopColor: colors.neutral.outlineGrey, },
        tabBarActiveTintColor: colors.primary.primaryPurpleDark,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
              <Image source={focused ? require('../../assets/icons/navIcons/HomeActive.png') : require('../../assets/icons/navIcons/Home.png')} />
              {focused ?
                <GradientText
                  text={'Home'}
                /> :
                <Text style={[styles.label, styles.inactiveLabel]}>Home</Text>}
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
            <Image source={focused ? require('../../assets/icons/navIcons/MapActive.png') : require('../../assets/icons/navIcons/Map.png')} />
            {focused ?
              <GradientText
                text={'Map'}
              /> :
              <Text style={[styles.label, styles.inactiveLabel]}>Map</Text>}
          </View>          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportsStack}
        options={{
          tabBarIcon: ({ focused, }) => (
            <View style={styles.iconContainer}>
            <Image source={focused ? require('../../assets/icons/navIcons/ReportActive.png') : require('../../assets/icons/navIcons/Report.png')} />
            {focused ?
              <GradientText
                text={'Report'}
              /> :
              <Text style={[styles.label, styles.inactiveLabel]}>Report</Text>}
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
            <Image source={focused ? require('../../assets/icons/navIcons/EventActive.png') : require('../../assets/icons/navIcons/Event.png')} />
            {focused ?
              <GradientText
                text={'Events'}
               /> :
              <Text style={[styles.label, styles.inactiveLabel]}>Events</Text>}
          </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.neutral.surfaceBlack,
  },
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
});

export default NavigationBottomTab;
