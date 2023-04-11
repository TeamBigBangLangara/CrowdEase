import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle2 } from "../styles/fonts";

const GradientText = (props: { text: string }) => {
  return (
    <MaskedView style={{ flex: 1, }} maskElement={
      <View>
        <LinearTextGradient
          locations={[0, 1]}
          colors={colors.primary.gradientDark.colors}
          start={colors.primary.gradientDark.start}
          end={colors.primary.gradientDark.end}
          style={styles.label}
        >
          <Text>{props.text}</Text>
        </LinearTextGradient>
      </View>
    }>
      <LinearTextGradient
        locations={[0, 1]}
        colors={colors.primary.gradientDark.colors}
        start={colors.primary.gradientDark.start}
        end={colors.primary.gradientDark.end}
        style={styles.label}
      >
        <Text>{props.text}</Text>
      </LinearTextGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    fontWeight: fontWeightSubtitle2,
  },
});

export default GradientText;
