import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MapView, { Marker } from "react-native-maps";
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { addBookmark, fetchBookmarks, removeBookmark } from "../api/bigBangAPI/bookmark";
import { cancelNotification, createNotification } from "../api/oneSignal";
import { getEventById } from "../api/event";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";
import { mapDarkStyle } from "../styles/maps";
import { EventsStackNavigationProps, MainStackNavigationProps } from "../types/navigationTypes";
import IconText from "../components/IconText";
import PrimaryButton from "../components/PrimaryButton";
import { getUser } from "../auth/user";
import { Bookmark, LoggedUser } from "types/types";
import SecondaryButton from "../components/SecondaryButton";
import { storage } from "../store/mmkv";

const EventDetailsScreen = ({ route, navigation, }: MainStackNavigationProps<"EventDetailsScreen"> | EventsStackNavigationProps<"EventDetailsScreen">) => {
  const isDark = storage.getBoolean("darkMode");

  const mapRef = React.useRef<any>(null);
  const queryClient = useQueryClient();
  const { eventId, } = route.params;
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: "", email: "", });
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");
  const [notificationId, setNotificationId] = useState("");

  useQuery("getUserData", getUser, {
    onSuccess: (data: LoggedUser) => {
      setUserInfo(data);
    },
  }
  );

  const requestEventById = useQuery("eventDetail", () => getEventById(eventId),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    });

  useQuery("bookmarks", () => {
    return fetchBookmarks(userInfo.uid);
  }, {
    onSuccess: (data) => {
      const bookmark = data.find((bookmark: Bookmark) => bookmark.event_id === eventId);
      if (bookmark) {
        setBookmarkId(bookmark._id);
        setIsBookmarkAdded(true);
      }
    },
    enabled: !!userInfo.uid,
  }
  );

  const saveBookmark = useMutation(["bookmarks"], () => addBookmark({
    "user_id": userInfo?.uid,
    "event_id": eventId,
  }), {
    onSuccess: (data) => {
      setBookmarkId(data);
      queryClient.invalidateQueries('bookmarks');
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });

  const deleteBookmark = useMutation(["bookmarks"], () => removeBookmark(bookmarkId), {
    onSuccess: () => {
      setBookmarkId("");
      queryClient.invalidateQueries('bookmarks');
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });

  const saveNotification = useMutation(["notifications"], () => createNotification(
    requestEventById.data!.dates.date,
    eventId,
    requestEventById.data!.name,
    requestEventById.data!.image),
    {
      onSuccess: (data) => {
        setNotificationId(data);
      },
      onError: () => {
        console.log("Something went wrong, please try again.");
      },
    });

  const deleteNotification = useMutation(["notifications"], () => cancelNotification(notificationId),
    {
      onError: () => {
        console.log("Something went wrong, please try again.");
      },
    });

  const dateObj = new Date(requestEventById.data?.dates.date);
  dateObj.setDate(dateObj.getDate() + 1);
  const formattedDate = dateObj.toLocaleString("en-US", { month: "long", day: "numeric", });

  const onBookMarkButtonPress = () => {
    if (!isBookmarkAdded) {
      try {
        saveBookmark.mutate();
        saveNotification.mutate();
        console.log(bookmarkId);
        setIsBookmarkAdded(!isBookmarkAdded);
      } catch (error) {
        Alert.alert("Unable to save data" + error);
      }
    } else {
      try {
        deleteBookmark.mutate();
        if (notificationId !== undefined) {
          deleteNotification.mutate();
        }
        setNotificationId("");
        setIsBookmarkAdded(!isBookmarkAdded);
      } catch (error) {
        Alert.alert("Unable to save data" + error);
      }
    }
  };

  const renderBookmarkButton = () => {
    if (isBookmarkAdded) {
      return <SecondaryButton
        onPress={onBookMarkButtonPress}
        label={"Remove Bookmark"}
        isDark={isDark}/>;
    } else {
      return <PrimaryButton
        onPress={onBookMarkButtonPress}
        label={"Add to Bookmark"}
        isDark={isDark} />;
    }
  };

  const renderMap = () => {
    if (!requestEventById.data?.location.latitude) {
      return null;
    }
    return (
      <MapView
        ref={mapRef}
        provider={"google"}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: Number(requestEventById.data?.location.latitude),
          longitude: Number(requestEventById.data?.location.longitude),
          latitudeDelta: 0.03,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: Number(requestEventById.data?.location.latitude),
            longitude: Number(requestEventById.data?.location.longitude),
          }}
          onPress={() => Alert.alert("Home", "My location")}
          pinColor={"#90EE90"}
        />
      </MapView>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require("../assets/icons/leftIcon.png")} style={styles.backImage}/>
          </Pressable>
        <Image source={{ uri: requestEventById.data?.image, }} style={styles.image} />
        <View style={styles.nameContainer}>
          <View style={styles.participantsContainer}>
            <Image source={require("../assets/icons/participants.png")} />
            <Text style={styles.number}>{requestEventById.data?.participants.toLocaleString("en-US")}
            </Text>
          </View>
          <Text adjustsFontSizeToFit={true} style={styles.name}>{requestEventById.data?.name}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <IconText
            icon={require("../assets/icons/calendar.png")}
            text={formattedDate}
            style={styles.iconText}
            isDark={isDark}
          />
          <IconText
            icon={require("../assets/icons/pin.png")}
            text={requestEventById.data?.address}
            style={styles.iconText}
            isDark={isDark}
          />
          <IconText
            icon={require("../assets/icons/category.png")}
            text={requestEventById.data?.category.name}
            style={styles.iconText}
            isDark={isDark}
          />
        </View>
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.details}>Join us on {requestEventById.data?.dates.date} the category of this event
            is {requestEventById.data?.category.name} and it will conduct in {requestEventById.data?.venue.name}</Text>
        </View>
        <View>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.address}>{requestEventById.data?.venue.name}</Text>
          <Text style={styles.details}>{requestEventById.data?.address}</Text>
        </View>
        {renderMap()}
        <View style={styles.buttonContainer}>
          {renderBookmarkButton()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 5,
    zIndex: 10,
  },
  backImage: {
width: 30,
height: 30,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomColor: colors.neutral.outlineGrey,
    borderBottomWidth: 2,
    maxWidth: 340,
    marginHorizontal: 20,
  },
  participantsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    marginHorizontal: -20,
    marginTop: 50,
  },
  number: {
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
  },
  name: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
  },
  iconTextContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
  iconText: {
    fontFamily: fontFamily.subtitle,
    fontSize: 30,
    fontWeight: fontWeightSubtitle,
    color: colors.neutral.surfaceWhite,
    marginBottom: 16,
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
    marginBottom: 8,
  },
  address: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
  },
  details: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightBody,
    color: colors.neutral.surfaceWhite,
    marginBottom: 32,
  },
  map: {
    height: 220,
    width: 350,
    borderRadius: 22,
    marginTop: -26,
    marginBottom: 32,
  },
  buttonContainer: {
    backgroundColor: colors.neutral.surfaceBlack,
    justifyContent: "center",
    alignItems: "center",
    height: 97,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
});
export default EventDetailsScreen;
