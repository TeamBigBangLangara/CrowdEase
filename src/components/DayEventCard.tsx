import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Event } from "../types/types";
import { borderRadius, margin } from "../styles/basic";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle } from "../styles/fonts";
import DropdownButton from "./DropdownButton";
import React, { useState } from "react";

const DayEventCard = (props: {
  event: Event
  percentage: number
}) => {
  const progressBarWidth = `${props.percentage}%`;

  const [showSuggestion, setShowSuggestion] = useState(false);

  const renderSuggestionButton = () => {
    return <DropdownButton label={"What we can do?"} onDropdownPress={() => setShowSuggestion(true)} />;
  };

  const renderSuggestions = () => {
    return (
      <View style={styles.suggestionContainer}>
        <View style={styles.suggestionTextContainer}>
          <Text style={styles.suggestionHeader}>We got your back! Let’s try use this chance to:</Text>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.suggestionText}> • </Text>
            <Text style={styles.suggestionText}>Customise your restaurant theme, music, and vibe according to this
              event.</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.suggestionText}> • </Text>
            <Text style={styles.suggestionText}>Hand out leaflets or coupons regarding your promotions.</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.suggestionText}> • </Text>
            <Text style={styles.suggestionText}>Prepare your inventory, staff, and manage your online orders.</Text>
          </View>
        </View>
        <Pressable style={styles.upIcon} onPress={() => setShowSuggestion(false)}>
          <Image source={require("../assets/icons/upIcon.png")} />
        </Pressable>
      </View>
    );
  };

  const renderIcon = () => {
    switch (props.event.category.name) {
      case "Sports":
        return <Image source={require("../assets/category/sport.png")} />;
      case "Music":
        return <Image source={require("../assets/category/music.png")} />;
      case "Festivals":
        return <Image source={require("../assets/category/festival.png")} />;
      case "Business":
        return <Image source={require("../assets/category/business.png")} />;
      case "Shows":
        return <Image source={require("../assets/category/show.png")} />;
      case "Other":
        return <Text> </Text>;
      default:
        return <Text>No Icon</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.eventNameContainer}>
          {renderIcon()}
          <Text style={styles.eventName}>{props.event.name}</Text>
        </View>
        <Text style={styles.participants}>{props.event.participants.toLocaleString("en-US")} participants</Text>
      </View>
      <Text style={styles.categoryLabel}>
        {props.percentage}% over {props.event.category.name} category
      </Text>
      <View style={styles.progressBar}>
        <View style={[styles.absoluteFill, { width: progressBarWidth, }]} />
      </View>
      <View>{!showSuggestion ? renderSuggestionButton() : ""}</View>
      {showSuggestion ? renderSuggestions() : ""}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: borderRadius.primary,
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  headerContainer: {
    marginTop: margin.secondary,
    gap: 10,
  },
  eventName: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle1,
    color: colors.neutral.surfaceWhite,
  },
  eventNameContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  participants: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.neutral.surfaceWhite,
    lineHeight: 18,
  },
  categoryLabel: {
    fontWeight: fontWeightBody,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    color: colors.neutral.surfaceWhite,
    textAlign: "center",
    marginTop: margin.primary,
    marginBottom: 2,
  },
  progressBar: {
    backgroundColor: colors.neutral.outlineGrey,
    borderRadius: borderRadius.primary,
  },
  absoluteFill: {
    height: 22,
    backgroundColor: colors.secondaryGreenDark,
    borderRadius: borderRadius.primary,
  },

  //Suggestion Styling
  suggestionContainer: {
    paddingTop: 20,
  },
  suggestionTextContainer: {
    gap: 10,
    padding: 5
  },
  suggestionText: {
    color: colors.neutral.surfaceWhite,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
  },
  suggestionHeader: {
    color: colors.neutral.surfaceWhite,
    fontSize: fontSize.subtitle2,
    fontFamily: fontFamily.subtitle,
    letterSpacing: 0.0128,
    lineHeight: 20,
    marginTop: margin.tertiary,
  },
  upIcon: {
    marginTop: margin.secondary,
    alignSelf: 'center',
  },
});

export default DayEventCard;
