import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import MapView from "react-native-maps";
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";

import { addBookmark, removeBookmark } from "../api/bigBangAPI/bookmark";
import { cancelNotification, createNotification } from "../api/oneSignal";
import { getEventById } from "../api/event";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";
import { mapDarkStyle } from "../styles/maps";
import { EventsStackNavigationProps, MainStackNavigationProps } from "../types/navigationTypes";
import IconText from "../components/IconText";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../auth/user";
import { fetchBookmarks } from "../api/bigBangAPI/bookmark";
import { Bookmark, LoggedUser } from "types/types";
import SecondaryButton from "../components/SecondaryButton";


const EventDetailsScreen = ({ route, }: MainStackNavigationProps<'EventDetailsScreen'> | EventsStackNavigationProps<'EventDetailsScreen'>) => {
  const { eventId, } = route.params;
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: "", email: "", });
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);
  const [bookmarkID, setBookmarkID] = useState("");
  const [notificationID, setNotificationID] = useState("");

  useQuery("getUserData", getUser, {
      onSuccess: (data:LoggedUser) => {
        setUserInfo(data);
      },
    }
  );
  const requestEventById = useQuery('eventDetail', () => getEventById(eventId),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    });
  
  const requestUserBookmarks = useQuery("bookmarks",  () => 
  {
    return fetchBookmarks(userInfo.uid);
    },{
    onSuccess: (data) => {
      const bookmark = data.find((bookmark: Bookmark) => bookmark.event_id === eventId);
      if (bookmark) {
            setBookmarkID(bookmark._id);
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
      setBookmarkID(data);
      requestUserBookmarks.refetch();
      console.log("Bookmark Saved");
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });

  const deleteBookmark = useMutation(["bookmarks"], () => removeBookmark(bookmarkID), {
    onSuccess: () => {
      setBookmarkID("");
      console.log("Bookmark Removed");
    },
    onError: () => {
      console.log("Something went wrong, please try again.");
    },
  });

  const saveNotification = useMutation(["createNewNotification"], () => createNotification(
    requestEventById.data.dates.date,
    eventId, 
    requestEventById.data.name, 
    requestEventById.data.image),
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

  // useEffect(() => {
  //   getBookmarkID();
  // }, []);  
    
  const mapRef = React.useRef<any>(null);

  const onBookMarkButtonPress = () => {
    if(!isBookmarkAdded){
      try{
      saveBookmark.mutate();
      saveNotification.mutate();
      console.log(bookmarkID);
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

  const renderBookmarkButton = () =>{
    if(isBookmarkAdded){
      return <SecondaryButton
      onPress={onBookMarkButtonPress}
      label={'Remove Bookmark'} />;
    }
    else{
      return <PrimaryButton
      onPress={onBookMarkButtonPress}
      label={'Add to Bookmark'} />;
    }
  };

  const dateObj = new Date(requestEventById.data?.dates.date);
  dateObj.setDate(dateObj.getDate() + 1);
  const formattedDate = dateObj.toLocaleString('en-US', { month: 'long', day: 'numeric', });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/icons/leftIcon.png')} />
          </Pressable>
          <Image source={{ uri: requestEventById.data?.image, }} style={styles.image} />
          <View style={styles.nameContainer}>
            <View style={styles.participantsContainer}>
              <Image source={require('../assets/icons/participants.png')} />
              <Text style={styles.number}>{requestEventById.data?.participants}</Text>
            </View>
            <Text style={styles.name}>{requestEventById.data?.name}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <IconText
              icon={require('../assets/icons/calendar.png')}
              text={formattedDate}
              style={styles.iconText} />
            <IconText
              icon={require('../assets/icons/pin.png')}
              text={requestEventById.data?.address}
              style={styles.iconText} />
            <IconText
              icon={require('../assets/icons/category.png')}
              text={requestEventById.data?.category.name}
              style={styles.iconText} />
          </View>
          <View>
            <Text style={styles.title}>About</Text>
            <Text style={styles.details}>Join us on {requestEventById.data?.dates.date} the category of this event is {requestEventById.data?.category.name} and it will conduct in {requestEventById.data?.venue.name}</Text>
          </View>
          <View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.address}>{requestEventById.data?.venue.name}</Text>
            <Text style={styles.details}>{requestEventById.data?.address}</Text>
          </View>
          <MapView
            ref={mapRef}
            provider={"google"}
            customMapStyle={mapDarkStyle}
            style={styles.map}
            initialRegion={{
              latitude: 49.264131,
              longitude: -123.1569595,
              latitudeDelta: 0.2,
              longitudeDelta: 0.3,
            }}
          >
          </MapView>
          <View style={styles.buttonContainer}>
            {renderBookmarkButton()}
          </View>
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
    position: 'absolute',
    top: 15,
    left: 5,
    zIndex: 10,

  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomColor: colors.neutral.outlineGrey,
    borderBottomWidth: 2,
    maxWidth: 340,
  },
  participantsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    marginHorizontal: -20,
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
    width: 330,
    borderRadius: 22,
    marginTop: -26,
    marginBottom: 32,
  },
  buttonContainer: {
    backgroundColor: colors.neutral.surfaceBlack,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginHorizontal: -18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 97,
  },
});
export default EventDetailsScreen;
