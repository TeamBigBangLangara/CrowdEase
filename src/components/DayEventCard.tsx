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
        <View>
          <Text style={styles.suggestionHeader}>We got your back! Let’s try use this chance to:</Text>
          <Text style={styles.suggestionText}> • Customise your restaurant theme, music, and vibe according to this
            event.</Text>
          <Text style={styles.suggestionText}>• Hand out leaflets or coupons regarding your promotions.</Text>
          <Text style={styles.suggestionText}>• Prepare your inventory, staff, and manage your online orders.</Text>
        </View>
        <Pressable style={styles.upIcon} onPress={() => setShowSuggestion(false)}>
          <Image source={require("../assets/upIcon.png")} />
        </Pressable>
      </View>
    );
  };

  const renderIcon = () => {
    switch (props.event.category.name) {
      case "sport":
        return <Image source={require("../assets/category/sport.png")} />;
      case "music":
        return <Image source={require("../assets/category/music.png")} />;
      case "festival":
        return <Image source={require("../assets/category/festival.png")} />;
      case "business":
        return <Image source={require("../assets/category/business.png")} />;
      case "show":
        return <Image source={require("../assets/category/show.png")} />;
      case "other":
        return <Text> </Text>;
      default:
        return <Text>No Icon</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.eventNameContainer}>
          <Text style={styles.eventName}>{props.event.name}</Text>
          {renderIcon()}
        </View>
        <Text style={styles.participants}>{props.event.participants} participants</Text>
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
    backgroundColor: colors.netural.surfaceBlack,
    borderRadius: borderRadius.primary,
    display: "flex",
    justifyContent: "center",
    padding: 8,
  },
  headerContainer: {
    marginTop: margin.secondary,
    gap: 4,
  },
  eventName: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle1,
    color: colors.netural.surfaceWhite,
  },
  eventNameContainer: {
    flexDirection: "row",
    gap: 4,
  },
  participants: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.netural.surfaceWhite,
    lineHeight: 18,
  },
  categoryLabel: {
    fontWeight: fontWeightBody,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    color: colors.netural.surfaceWhite,
    textAlign: "center",
    marginTop: margin.primary,
    marginBottom: 2,
  },
  progressBar: {
    backgroundColor: colors.netural.outlineGrey,
    borderRadius: borderRadius.primary,
  },
  absoluteFill: {
    height: 22,
    backgroundColor: colors.secondaryGreenDark,
    borderRadius: borderRadius.primary,
  },

  //Suggestion Styling
  suggestionContainer: {
    alignItems: "center",
  },
  suggestionText: {
    color: colors.netural.surfaceWhite,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
  },
  suggestionHeader: {
    color: colors.netural.surfaceWhite,
    fontSize: fontSize.subtitle2,
    fontFamily: fontFamily.subtitle,
    letterSpacing: 0.0128,
    lineHeight: 20,
    marginTop: margin.tertiary,
  },
  upIcon: {
    marginTop: margin.secondary,
  },
});

export default DayEventCard;
