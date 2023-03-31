import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import DayEventCard from "../components/DayEventCard";
import ParticipantsByCategory from "../components/ParticipantsByCategory";
import PrimaryButton from "../components/PrimaryButton";

import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";

const testEvent: Event = {
  bookmarkId: "001",
  id: "eve001",
  ratingID: "good",
  rate: 1000,
  name: "testName",
  image: "no image",
  dates: new Date,
  category: "Music",
  location: {
    longitude: "0",
    latitude: "0",
  },
  venue: {
    name: "VenueName",
    id: "0001",
    type: "stadium",
  },
  address: "Langara College",
  participants: 1000000,
};

const SuggestionScreen = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Let's break Feb07 down, get ready to serve music lovers</Text>
        <View style={{flex: 1,}}>
          <Text style={styles.sectionTitle}>
            February 07, 2023
          </Text>
          <ParticipantsByCategory participants={3} percentage={50} musicQty={5} sportQty={5} showsQty={5} festivalsQty={5} businessQty={5} otherQty={5}/>
        </View>
        <View style={{flex: 1,}}>
          <Text style={styles.sectionTitle}>
            Major Event of the day
          </Text>
          <DayEventCard event={testEvent} percentage={5}/>
        </View>
        <View style={{alignItems: 'center',}}>
          <PrimaryButton onPress={() => console.log("under development")} label={"Test Buttton"}/>
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 18,
    paddingVertical: 25,
    rowGap: 32,
  },
  screenTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading1,
    lineHeight: 36,
    textAlign: 'left',
    color: colors.neutral.surfaceWhite,
  },
  sectionTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.subtitle1,
    lineHeight: 36,
    textAlign: 'left',
    color: colors.neutral.surfaceWhite,
  },
});

export default SuggestionScreen;
