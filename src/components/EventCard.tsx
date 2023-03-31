import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import BookmarkButton from "./BookmarkButton";
import IconText from "./IconText";
import RateCard from "./RateCard";
import DropdownButton from "./DropdownButton";
import { Event } from "../types/types";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { timeFormat } from "../utils/timeFormat";
import { addBookmark, removeBookmark } from "../api/bigBangAPI/bookmark";
import { cancelNotification, createNotification } from "../api/oneSignal";

const EventCard = (props: {
  event: Event
  eventType: string
  userId?: string,
  bookmarkId?: string
  onDetail: () => void
}) => {

  const saveBookmark = useMutation(["bookmark"], () => addBookmark({
    "user_id": props.userId!,
    "event_id": props.event.id,
  }), {
    onSuccess: (data) => {
      setBookmarkID(data);
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });

  const deleteBookmark = useMutation(["bookmark"], () => removeBookmark(bookmarkID), {
    onSuccess: () => {
      setBookmarkID("");
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });
  const saveNotification = useMutation(["createNewNotification"], () => createNotification(props.event.dates.date,props.event.id, props.event.name, props.event.image),
   {
    onSuccess: (data) => {
      console.log(data);
      setNotificationID(data);
    },
    onError: () => {
        console.log("Something went wrong, please try again.");
    },
  });

  const deleteNotification = useMutation(["deleteNotification"], () => cancelNotification(notificationID),
   {
    onSuccess: (data) => {
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });


  useEffect(() => {
    if (props.bookmarkId !== undefined) {
      setBookmarkID(props.bookmarkId);
      setIsBookmarkAdded(true);
    }

  }, []);

  const [showRating, setShowRating] = useState(false);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);
  const [bookmarkID, setBookmarkID] = useState("");
  const [notificationID, setNotificationID] = useState("");

  const onBookmarkPress = () => {
    if(!isBookmarkAdded)
    {
      try{
      const saveBookmarkData =  saveBookmark.mutate();
      saveNotification.mutate();
      setIsBookmarkAdded(!isBookmarkAdded);
      }
      catch(error){
        Alert.alert('Unable to save data' +error);
      }
    }
    else{
      try{
         deleteBookmark.mutate();
         if(notificationID !== undefined)
          {
            console.log("To cancel" + notificationID);
            deleteNotification.mutate();
          }
          setNotificationID('');
          setIsBookmarkAdded(!isBookmarkAdded);
        }
      catch(error){
        Alert.alert('Unable to save data' +error);
      }
    }
  };

  const renderDate = () => {
    if (props.eventType === "past") {
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
    if (props.eventType !== "past") {
      return <BookmarkButton
        eventId={props.event.id}
        userID={props.userId}
        isBookmarkAdded={isBookmarkAdded}
        onBookmarkPress={onBookmarkPress}
      />;
    }
  };

  const renderRatingButton = () => {
    if (props.eventType === "past") {
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
        event={props.event}
        onSkipPress={() => { setShowRating(false); }}
        userId={props.userId!}
      />
    );
  };

  const renderDragUpButton = () => {
    if (props.eventType === "mapEvent") {
      return (
        <View style={styles.dragUpContainer}>
          <Image source={require("../assets/icons/dragUp.png")} />
        </View>
      );
    }
  };

  return (
    <Pressable onPress={props.onDetail}>
      <View style={styles.container}>
        {renderDragUpButton()}
        <View style={styles.eventContainer}>
          <Image source={{ uri: props.event.image, }} style={styles.eventImage} />
          <View style={styles.leftContainer}>
            <View style={styles.upContainer}>
              {renderDate()}
              <Text style={styles.eventTitle} numberOfLines={1}>{props.event.name}</Text>
              <IconText icon={require("../assets/icons/pin.png")} numberOfLines={1} text={props.event.address}
                        style={styles.icon} />
            </View>
            <View style={styles.participantsContainer}>
              <IconText
                icon={require("../assets/icons/participants.png")}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.surfaceBlack,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "column",
    display: "flex",
    borderRadius: 22,
    marginVertical: 8,
  },
  eventContainer: {
    display: "flex",
    flexDirection: "row",
  },
  label: {
    color: colors.neutral.backgroundWhite,
    fontSize: fontSize.body,
    lineHeight: 18,
    fontFamily: fontFamily.body,
  },
  eventImage: {
    width: 92,
    height: 102,
    display: "flex",
    borderRadius: 11,
  },
  leftContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: fontSize.subtitle2,
    color: colors.neutral.backgroundWhite,
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
