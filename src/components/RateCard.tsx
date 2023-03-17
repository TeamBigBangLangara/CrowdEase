import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SecondaryButton from './SecondaryButton';
import LinkButton from './LinkButton';
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { margin } from "../styles/basic";

const RateCard = (props: { onSubmitPress: () => void; onSkipPress: () => void; onStarPress: (id: number) => void; imageActive: object; imageInactive: object; activeStarCount: number }) => {

  const renderStars = () => {
    const starIds = [1, 2, 3, 4, 5];
    return (
      <View style={styles.starContainer}>
        {starIds.map(id => (
          <Pressable key={id} onPress={() => props.onStarPress(id)}>
            <Image source={id <= props.activeStarCount ? props.imageActive : props.imageInactive} />
          </Pressable>
        ))}
      </View>
    );
  }


  const renderEventCard = () => {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please tell how much this event affected your business?</Text>
      {renderStars()}
      <SecondaryButton onPress={props.onSubmitPress} label={'Submit'} />
      <View style={styles.skipLabel}>
        <LinkButton onPress={props.onSkipPress} label={'Skip'} style={styles.linkBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: colors.netural.surfaceWhite,
    alignItems: 'center',
    marginTop: margin.secondary,
    backgroundColor: colors.netural.surfaceBlack,
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
    color: colors.netural.backgroundWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
  },
  linkBtn: {
    color: '#ffff',
    borderBottomColor: '#ffffff0'
  }
});

export default RateCard;
