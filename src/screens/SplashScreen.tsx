import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthStackNavigationProps } from "../types/navigationTypes";

import FastImage from "react-native-fast-image";

const SplashScreen = ({ navigation, }: AuthStackNavigationProps<"SplashScreen">) => {

  useEffect(() => {

    if (navigation) {
      navigation.setOptions({
        headerShown: false,
      });

      setTimeout(() => {
        navigation.navigate("LaunchScreen");
      }, 6000);
    }
  }, []);


  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <FastImage
        source={require("../assets/animations/splashScreen.gif")}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  gif: {
    width: "100%",
    height: "100%",
  },
});


export default SplashScreen;
