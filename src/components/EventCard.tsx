import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, Alert } from "react-native";

import BookmarkButton from './BookmarkButton';
import IconText from './IconText';
import RateCard from "./RateCard";
import DropdownButton from "./DropdownButton";

const EventCard = (props: {
  eventImage?: any
  eventTime: string
  eventName: string
  eventLocation: string
  eventParticipantsQty: number
  eventDate?: string
  onBookmarkPress?: () => void
  eventType: string
}) => {
  const [showRating, setShowRating] = useState(false);

  const renderDate = () => {
    if (props.eventType === 'past') {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.text}>{props.eventDate}</Text>
          <Text style={styles.text}>{props.eventTime}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>{props.eventTime}</Text>
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
       <DropdownButton onDropdownPress={() => setShowRating(true)} label={"Give a Rating"}/>
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

  return (
    <View style={styles.container}>
      <View style={styles.eventContainer}>
        <Image source={props.eventImage} style={styles.eventImage} />
        <View style={styles.leftContainer}>
          {renderDate()}
          <IconText icon={require('../assets/pin.png')} text={props.eventLocation} />
          <View style={styles.participantsContainer}>
            <IconText
              icon={require('../assets/participants.png')}
              text={`${props.eventParticipantsQty} participants`}
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
    backgroundColor: 'rgba(12, 12, 14, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'column',
    display: 'flex',
    borderRadius: 22,
  },
  eventContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: '#FAFBFC',
    fontSize: 14,
    lineHeight: 18,
  },
  eventImage: {
    width: 100,
    height: 100,
    display: 'flex',
    backgroundColor: 'beige',
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EventCard;
