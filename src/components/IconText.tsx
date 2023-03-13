import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";

const IconText = (props: { icon: any; text: string, style?: object }) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image source={props.icon} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    color: colors.netural.backgroundWhite,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    lineHeight: 18,
  },
});

export default IconText;
