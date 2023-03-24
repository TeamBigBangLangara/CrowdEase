import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import { useMutation } from "react-query";

import BookmarkButton from './BookmarkButton';
import IconText from './IconText';
import RateCard from "./RateCard";
import DropdownButton from "./DropdownButton";
import { Event } from "../types/types";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { timeFormat } from "../utils/timeFormat";
import { addRating } from "../api/bigBangAPI/rating";

const EventCard = (props: {
  event: Event
  onBookmarkPress?: () => void
  eventType: string
  userID: string
  rate: number
  ratingID: string
}) => {

  const [showRating, setShowRating] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [ratingID, setRatingID] = useState("");

  const saveRating = useMutation(["rating"], () =>
    addRating({
      user_id: props.userID,
      event_id: props.event.id,
      category: props.event.category.name,
      rate: props.rate,
    }),
    {
      onSuccess: (data) => {
        setRatingID(data);
      },
      onError: () => {
        console.log("Something went wrong, please try again.");
      },
    }
  );

  useEffect(() => {
    if (props.ratingID !== undefined)
     {

      setRatingID(props.ratingID);
    }

  }, []);

  const onStarPress = () => {
    setStarRating(props.rate);
  };

  const onSubmitPress = () => {
    try {
      const saveRatingData: any = saveRating.mutate();
    }
    catch (error) {
      Alert.alert('Unable to save data' + error);
    }
  }

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
          <DropdownButton onDropdownPress={() => setShowRating(true)} label={"Give a Rating"} />
        </View>
      );
    }
  };

  const renderRatingCard = () => {
    return (
      <RateCard
        onSubmitPress={onSubmitPress}
        onSkipPress={() => { setShowRating(false) }}
        onStarPress={onStarPress}
        imageActive={require("../assets/icons/StarActive.png")}
        imageInactive={require("../assets/icons/star.png")}
        activeStarCount={props.rate}
        eventId={props.event.id}
        userID={props.userID}
      />
    );
  };

  const renderDragUpButton = () => {
    if (props.eventType === "mapEvent") {
      return (
        <View style={styles.dragUpContainer}>
          <Image source={require('../assets/icons/dragUp.png')} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderDragUpButton()}
      <View style={styles.eventContainer}>
        <Image source={require('../assets/eventImage.png')} style={styles.eventImage} />
        <View style={styles.leftContainer}>
          <View style={styles.upContainer}>
            {renderDate()}
            <Text style={styles.eventTitle} numberOfLines={1}>{props.event.name}</Text>
            <IconText icon={require('../assets/icons/pin.png')} numberOfLines={1} text={props.event.address} style={styles.icon} />
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
