import { Image, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeight } from "../styles/fonts";

const DropdownButton = (props: {onDropdownPress: () => void, label: string}) => {
  return (
    <Pressable onPress={props.onDropdownPress} style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Image source={require('../assets/downIcon.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  label: {
    color: colors.netural.backgroundWhite,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    fontWeight: fontWeight.label,
    lineHeight: 18,
  },
});
export default DropdownButton;
