import React, { useEffect, useState } from "react";
import { useMutation } from 'react-query';
import { View, Image, Text, StyleSheet, Alert } from "react-native";

import BookmarkButton from './BookmarkButton';
import IconText from './IconText';
import RateCard from "./RateCard";
import DropdownButton from "./DropdownButton";
import { Event } from "../types/types";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { timeFormat } from "../utils/timeFormat";
import { addBookmark, removeBookmark } from '../api/bigBangAPI/bookmark';



const EventCard = (props: {
  event: Event
  eventType: string
  userID: string
  bookmarkID: string
  }) => {

  const saveBookmark = useMutation(["bookmark"], () => addBookmark({
    "user_id": props.userID,
    "event_id": props.event.id,
  }), {
    onSuccess: (data) => {
      console.log('Success :added');
      setBookmarkID(data);
    },
    onError: () => {
        console.log("Something went wrong, please try again.");
    },
  });

  const deleteBookmark = useMutation(["bookmark"], () => removeBookmark(bookmarkID), {
    onSuccess: (data) => {
      console.log("Deleted ID "+bookmarkID);
      console.log('Success: removed');
      setBookmarkID('');
    },
    onError: () => {
        console.log("Something went wrong, please try again.");
    },
  });


  useEffect(() => {
    console.log("here "+ props?.bookmarkID);
    // console.log(props.event);
    if(props.bookmarkID !== undefined)
    {
      setBookmarkID(props.bookmarkID);
      console.log("Bookmark set");
      setBookmarkIsAdded(true);
    }
    
  }, []);

  // const loadBookmark = () => {
  //   console.log("here "+ props?.bookmarkID);
  //   // console.log(props.event);
  //   if(props.bookmarkID !== undefined)
  //   {
  //     setBookmarkID(props.bookmarkID);
  //     console.log("Bookmark set");
  //     setBookmarkIsAdded(true);
  //   }
  // };


  const [showRating, setShowRating] = useState(false);
  const [bookmarkIsAdded, setBookmarkIsAdded] = useState(false);
  const [bookmarkID, setBookmarkID] =  useState("");

  const onBookmarkPress = async() => {
    if(!bookmarkIsAdded)
    {
    try {
    const saveBookmarkData : any = await saveBookmark.mutate();
    setBookmarkIsAdded(!bookmarkIsAdded);
    }
    catch(error){
      Alert.alert('Unable to save data' +error);
    }
  }
    else{
      try{
        await deleteBookmark.mutate();
        setBookmarkIsAdded(!bookmarkIsAdded);
      }
      catch(error){
        Alert.alert('Unable to save data' +error);
      }
    }
  };

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
    // loadBookmark();
    if (props.eventType !== 'past') {
      return <BookmarkButton 
      eventId={props.event.id}
      userID= {props.userID}
      bookmarkIsAdded= {bookmarkIsAdded}
      onBookmarkPress={onBookmarkPress}
      />;
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
        <Image source={require('../assets/eventImage.png')} style={styles.eventImage} />
        <View style={styles.leftContainer}>
          <View style={styles.upContainer}>
            {renderDate()}
            <Text style={styles.eventTitle}>{props.event.name}</Text>
            <IconText icon={require('../assets/icons/pin.png')} text={props.event.address} style={styles.icon}/>
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
