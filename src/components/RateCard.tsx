import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SecondaryButton from './SecondaryButton';
import LinkButton from './LinkButton';
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeight } from "../styles/fonts";

const RateCard = (props: { onSubmitPress: () => void; onSkipPress: () => void, onStarPress: () => void}) => {

  const renderStars = () => {
      return (
        <View style={styles.starContainer}>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/star.png")}/>
          </Pressable>
          <Pressable onPress={props.onStarPress}>
            <Image source={require("../assets/star.png")}/>
          </Pressable>
        </View>

      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please tell how much this event affected your business?</Text>
      {renderStars()}
      <SecondaryButton onClick={props.onSubmitPress} label={'Submit'} />
      <View style={styles.skipLabel}>
        <LinkButton onClick={props.onSkipPress} label={'Skip'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: colors.netural.surfaceWhite,
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: colors.netural.surfaceBlack,
  },
  starContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 24,
    marginTop: 8,
  },
  skipLabel: {
    marginTop: 16,
    alignItems: "center",
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
    color: colors.netural.backgroundWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
  },
});

export default RateCard;
