import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import BookmarkButton from './BookmarkButton';
import IconText from './IconText';
import RateCard from "./RateCard";
import DropdownButton from "./DropdownButton";
import { Event } from "../types/types";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { timeFormat } from "../utils/timeFormat";

const EventCard = (props: {
  event: Event
  onBookmarkPress?: () => void
  eventType: string
}) => {
  const [showRating, setShowRating] = useState(false);

  const renderDate = () => {
    if (props.eventType === 'past') {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.label}>{props.event.dates.date}</Text>
          <Text style={styles.label}>{timeFormat(props.event.dates.time)}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.label}>{timeFormat(props.event.dates.time)}</Text>
        </View>
      );
    }
  };

  const renderBookmarkButton = () => {
    if (props.eventType !== 'past') {
      return <BookmarkButton onBookmarkPress={props.onBookmarkPress} />;
    }
  };

  const renderRatingButton = () => {
    if (props.eventType === 'past') {
      return (
        <View style={styles.ratingButton}>
          <DropdownButton onDropdownPress={() => setShowRating(true)} label={"Give a Rating"}/>
        </View>
      );
    }
  };

  const renderRatingCard = () => {
    return (
      <RateCard
        onSubmitPress={() => { console.log("to do");}}
        onSkipPress={() => setShowRating(false)}
        onStarPress={() => { console.log("to do");}}/>
    );
  };

  const renderDragUpButton = () => {
    if (props.eventType === "mapEvent") {
      return (
        <View style={styles.dragUpContainer}>
            <Image source={require('../assets/icons/dragUp.png')}/>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderDragUpButton()}
      <View style={styles.eventContainer}>
        <Image source={{ uri: props.event.image,}} style={styles.eventImage} />
        <View style={styles.leftContainer}>
          <View style={styles.upContainer}>
            {renderDate()}
            <Text style={styles.eventTitle} numberOfLines={1}>{props.event.name}</Text>
            <IconText icon={require('../assets/icons/pin.png')} numberOfLines={1} text={props.event.address} style={styles.icon}/>
          </View>
          <View style={styles.participantsContainer}>
            <IconText
              icon={require('../assets/icons/participants.png')}
              text={`${props.event.participants} participants`}
              style={styles.icon}
            />
            {renderBookmarkButton()}
          </View>
        </View>
      </View>
      <View>{!showRating ? renderRatingButton() : ""}</View>
      {showRating ? renderRatingCard() : ""}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.netural.surfaceBlack,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'column',
    display: 'flex',
    borderRadius: 22,
    marginVertical: 8,
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: colors.netural.backgroundWhite,
    fontSize: fontSize.body,
    lineHeight: 18,
    fontFamily: fontFamily.body,
  },
  eventImage: {
    width: 92,
    height: 102,
    display: 'flex',
    borderRadius: 11,
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: fontSize.subtitle2,
    color: colors.netural.backgroundWhite,
    fontFamily: fontFamily.body,
  },
  upContainer: {
    gap: 4,
  },
  ratingButton: {
    marginTop: 12,
  },
  dragUpContainer: {
    alignItems: "center",
    marginBottom: 13,
  },
  icon: {
    alignItems: "flex-end",
  },
});

export default EventCard;
