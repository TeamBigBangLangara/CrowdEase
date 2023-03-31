import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import DayEventCard from "../components/DayEventCard";
import ParticipantsByCategory from "../components/ParticipantsByCategory";
import PrimaryButton from "../components/PrimaryButton";

import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";

const testEvent: Event = {
  bookmarkId: "001",
  id: "091298123",
  ratingID: "good",
  rate: 1000,
  name: "Coldplay Concert",
  image: "no image",
  dates: new Date,
  category: "Music",
  location: {
    longitud: "0",
    latitude: "0",
  },
  venue: {
    name: "Science World",
    id: "0001",
    type: "stadium",
  },
  address: "1455 Quebec St, Vancouver, BC V6A 3Z7",
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
          <ParticipantsByCategory participants={3} percentage={50} musicQty={50} sportQty={50} showsQty={50} festivalsQty={45} businessQty={5} otherQty={5}/>
        </View>
        <View style={{flex: 1,}}>
          <Text style={styles.sectionTitle}>
            Major Event of the day
          </Text>
          <DayEventCard event={testEvent} percentage={50}/>
        </View>
        <View style={{alignItems: 'center',}}>
          <PrimaryButton onPress={() => console.log("under development")} label={"Return to the week preview"}/>
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
