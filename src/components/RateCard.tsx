import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SecondaryButton from './SecondaryButton';
import LinkButton from './LinkButton';
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { margin } from "../styles/basic";

const RateCard = (props: { onSubmitPress: () => void; onSkipPress: () => void, onStarPress: () => void}) => {

  const renderStars = () => {
      return (
        <View style={styles.starContainer}>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/icons/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/icons/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/icons/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/icons/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/icons/star.png")}/>
          </Pressable>
        </View>

      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please tell how much this event affected your business?</Text>
      {renderStars()}
      <SecondaryButton onPress={props.onSubmitPress} label={'Submit'} />
      <View style={styles.skipLabel}>
        <LinkButton onPress={props.onSkipPress} label={'Skip'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: colors.neutral.surfaceWhite,
    alignItems: 'center',
    marginTop: margin.secondary,
    backgroundColor: colors.neutral.surfaceBlack,
  },
  starContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 24,
    marginTop: margin.tertiary,
  },
  skipLabel: {
    marginTop: margin.secondary,
    alignItems: "center",
  },
  header: {
    marginTop: margin.secondary,
    marginBottom: margin.tertiary,
    color: colors.neutral.backgroundWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
  },
});

export default RateCard;
