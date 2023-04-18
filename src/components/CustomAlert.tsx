import { Button, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle2 } from "../styles/fonts";
import LinkButton from "./LinkButton";
import { Pressable } from "react-native";

const CustomAlert = (props: { onOkPress: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Submitted successfully!</Text>
      <FastImage
        source={require("../assets/animations/checkmarkCircle.gif")}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Pressable onPress={props.onOkPress}>
        <Text style={styles.btn}>Done</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33,33,33,0.95)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
    position: 'absolute',
    top: -30,
    padding: 20,
    borderRadius: 22
  },
  text: {
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    textAlign: 'center',
    color: colors.neutral.surfaceWhite
  },
  gif: {
    height: '80%',
    width: '80%',
    justifySelf: 'center'
  },
  btn: {
    // fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    textAlign: 'right',
    color: colors.neutral.surfaceWhite
  },
})
export default CustomAlert;