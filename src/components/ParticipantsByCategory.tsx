import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { borderRadius } from "../styles/basic";

const ParticipantsByCategory = (props: {
  participants: number
  percentage: number
  musicQty: number
  sportQty: number
  showsQty: number
  festivalsQty: number
  businessQty: number
  otherQty: number
}) => {
  const parent = {
    readings: [
      { value: props.musicQty, color: colors.secondaryGreenDark, },
      { value: props.sportQty, color: colors.primary.primaryPurpleDark, },
      { value: props.showsQty, color: colors.accent.darkModeRed, },
      { value: props.festivalsQty, color: colors.accent.accentYellowDark, },
      { value: props.businessQty, color: colors.accent.accentBlueDark, },
      { value: props.otherQty, color: colors.neutral.outlineGrey, }
    ],
  };

  // Calculate the total value of all readings
  const total = parent.readings.reduce((sum: number, item: any) => sum + item.value, 0);

  // Initialize the current position to 0
  let currentPos = 0;

  // Map over the readings array to create a list of bar graph components
  let values =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item: any, i: number) {
      // Check if the reading value is greater than 0
      if (item.value > 0) {
        // Calculate the width and position of the bar graph
        const width = (item.value / total) * 100;
        const left = (currentPos / total) * 100;

        // Increment the current position by the value of the current reading
        currentPos += item.value;

        // Return a View component representing the current bar graph
        return (
          <View
            style={[
              styles.bar,
              { left: `${left}%`, width: `${width}%`, backgroundColor: item.color, }
            ]}
            key={i}></View>
        );
      }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.participants}>{props.participants.toLocaleString("en-US")} participants</Text>
      <Text style={styles.infoPercentage}>{props.percentage}% less than last week</Text>
      <View style={styles.progressbar}>
        <View>{values}</View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/music.png')} />
          <Text style={styles.name}>Music</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.secondaryGreenDark, }]}></View>
          <Text style={styles.percentage}>{props.musicQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/sport.png')} />
          <Text style={styles.name}>Sport</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.primary.primaryPurpleDark, }]}></View>
          <Text style={styles.percentage}>{props.sportQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/show.png')} />
          <Text style={styles.name}>Shows</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.accent.darkModeRed, }]}></View>
          <Text style={styles.percentage}>{props.showsQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/festival.png')} />
          <Text style={styles.name}>Festivals</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.accent.accentYellowDark, }]}></View>
          <Text style={styles.percentage}>{props.festivalsQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/business.png')} />
          <Text style={styles.name}>Business</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.accent.accentBlueDark, }]}></View>
          <Text style={styles.percentage}>{props.businessQty}</Text>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.iconNameContainer}>
          <Image source={require('../assets/category/other.png')} />
          <Text style={styles.name}>Other</Text>
        </View>
        <View>
          <View style={[styles.sign, { backgroundColor: colors.neutral.outlineGrey, }]}></View>
          <Text style={styles.percentage}>{props.otherQty}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 4,
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: borderRadius.primary,
    padding: 8,
    paddingVertical: 16,
  },
  participants: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle1,
    fontFamily: fontFamily.body,
    color: colors.neutral.surfaceWhite,
    marginBottom: 4,
  },
  infoPercentage: {
    fontWeight: fontWeightSubtitle,
    fontSize: 16,
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
  },
  progressbar: {
    height: 38,
    backgroundColor: colors.neutral.outlineGrey,
    borderRadius: borderRadius.primary,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 16,
  },
  bar: {
    height: 38,
    position: 'absolute',
    top: 0,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 40,
  },
  iconNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
  },
  sign: {
    width: 50,
    height: 6,
    borderRadius: 22,
  },
  percentage: {
    color: colors.neutral.surfaceWhite,
    textAlign: 'center',
    fontFamily: fontFamily.body,
  },
});

export default ParticipantsByCategory;
