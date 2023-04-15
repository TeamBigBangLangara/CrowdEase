import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";

import { MainStackNavigationProps } from "../types/navigationTypes";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";
import IconText from "../components/IconText";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import ParticipantsByMealCard from "../components/ParticipantsByMealCard";
import LinkButton from "../components/LinkButton";
import DataVisualization from "../components/DataVisualization";
import { getDate } from "../utils/getDate";
import { borderRadius } from "../styles/basic";
import EventCarousel from "../components/EventCarousel";
//import { getEvents } from "../api/event";
import { env } from "../../env";
import { getEvents } from "../api/bigBangAPI/JsonEvents";

import OneSignal from "react-native-onesignal";
import { storage } from "../store/mmkv";
import { useEffect, useState } from "react";

const ONESIGNAL_APP_ID = env.REACT_ONESIGNAL_APP_ID;

// Get the dates
const { formattedFirstDay, formattedLastDay, today, todayFormatted, week, getWeekday, } = getDate();

const HomeScreen = ({ navigation, }: MainStackNavigationProps<'HomeScreen'>) => {
  const [isDark, setIsDark] = useState(storage.getBoolean("darkMode") || false);

  useEffect(() => {
    storage.addOnValueChangedListener((key) => {
      if (key === 'darkMode') {
        setIsDark(storage.getBoolean("darkMode")!);
      }
    });
  }, []);

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const onFullReportPress = () => {
    navigation.navigate('Report');
  };

  const onSeeSuggestionPress = () => {
    navigation.navigate('Report', { screen: 'SuggestionScreen', });
  };

  const onSeeMorePress = () => {
    navigation.navigate('Events');
  };
  const onProfileScreen = () => {
    navigation.navigate('ProfileScreen');
  };

  const renderTodayParticipants = () => {
    let participants = 0;
    requestEvents.data?.forEach((event) => {
      if (event.dates.date === todayFormatted) {
        participants += event.participants;
      }
    });
    return (
      <Text style={isDark ? styles.todayParticipantsNumber : lightModeStyles.todayParticipantsNumber}>{participants}</Text>
    );
  };

  const renderMorningParticipants = () => {
    let participants = 0;
    requestEvents.data?.forEach(event => {
      if (event.dates.date === todayFormatted) {
        const eventHour = parseInt(event.dates.time.split(':')[0]);
        if (eventHour >= 6 && eventHour < 12) {
          participants += event.participants;
        }
      }
    });
    return (
      participants
    );
  };

  const renderLunchParticipants = () => {
    let participants = 0;
    requestEvents.data?.forEach(event => {
      if (event.dates.date === todayFormatted) {
        const eventHour = parseInt(event.dates.time.split(':')[0]);
        if (eventHour >= 13 && eventHour < 17) {
          participants += event.participants;
        }
      }
    });
    return (
      participants
    );
  };

  const renderDinnerParticipants = () => {
    let participants = 0;
    requestEvents.data?.forEach(event => {
      if (event.dates.date === todayFormatted) {
        const eventHour = parseInt(event.dates.time.split(':')[0]);
        if (eventHour >= 18 && eventHour <= 22) {
          participants += event.participants;
        }
      }
    });
    return (
      participants
    );
  };

  const renderBusyDay = () => {
    const weekParticipants = [];
    //get each day with  participants
    for (let i = 0; i < 7; i++) {
      const dayParticipants = {
        day: week[i],
        participants: 0,
      };
      requestEvents.data?.forEach((event) => {
        if (event.dates.date === week[i]) {
          dayParticipants.participants += event.participants;
        }
      });
      weekParticipants.push(dayParticipants);
    }

    //find the busiest day
    let highestIndex = 0;
    for (let i = 1; i < weekParticipants.length; i++) {
      if (
        weekParticipants[i].participants >
        weekParticipants[highestIndex].participants
      ) {
        highestIndex = i;
      }
    }
    const dateWithHighestParticipants =
      weekParticipants[highestIndex].day;

    //format the busiest day
    const dateObj = new Date(dateWithHighestParticipants);
    dateObj.setDate(dateObj.getDate() + 1);
    const formattedDate = dateObj.toLocaleString('en-US', { month: 'long', day: 'numeric', });
    const day = getWeekday(dateWithHighestParticipants);

    return <Text style={styles.busyDay}>{formattedDate} {day}</Text>;
  };

  // OneSignal Initialization
  OneSignal.setAppId(env.REACT_ONESIGNAL_APP_ID);

  // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData;
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    }
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    const eventID = notification?.notification.additionalData.eventID;
    navigation.navigate("EventDetailsScreen", { eventId: eventID, });
  });

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  const eventID = notification?.notification.additionalData.eventID;
  navigation.navigate("EventDetailsScreen", {eventId: eventID,});
});

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <View style={isDark ? styles.container : lightModeStyles.container}>
          <View style={isDark ? styles.header : lightModeStyles.header}>
            <Text style={isDark ? styles.headerTitle : lightModeStyles.headerTitle}>Crowd Ease</Text>
            <Pressable onPress={onProfileScreen}>
            <Image style={styles.profileIcon} source={isDark ? require('../assets/icons/profile.png') : require('../assets/icons/lightMode/profile.png')} />
            </Pressable>
          </View>
          <Text style={isDark ? styles.title : lightModeStyles.title}>Preview of this week's events</Text>
          <View style={styles.dataVisualizationContainer}>
            <DataVisualization isDark={isDark} />
          </View>
          <View style={isDark ? styles.dataBox : lightModeStyles.dataBox}>
            <Text style={isDark ? styles.date : lightModeStyles.date}>{`${formattedFirstDay} - ${formattedLastDay}`}</Text>
            <PrimaryButton onPress={onFullReportPress} label={'View Full Report'} isDark={isDark} />
          </View>
          <View style={isDark ? styles.suggestionContainer : lightModeStyles.suggestionContainer}>
            <Text style={isDark ? styles.subtitle : lightModeStyles.subtitle}>It seems that {renderBusyDay()} is the busiest day of this week, would you like to see some promotional opportunities?</Text>
            <SecondaryButton onPress={onSeeSuggestionPress} label={'See Suggestions'} isDark={isDark} />
          </View>
          <View style={styles.todayParticipantsContainer}>
            <View style={styles.todayParticipantTitle}>
              <Text style={isDark ? styles.title : lightModeStyles.title}>Event Participants for today</Text>
              <Text style={isDark ? styles.todayDate : lightModeStyles.todayDate}>{today}</Text>
            </View>
            <View style={isDark ? styles.numberContainer : lightModeStyles.numberContainer}>
              <IconText icon={isDark ? require('../assets/icons/participants.png') : require('../assets/icons/lightMode/Participants.png')} text={'Total Participants'} style={isDark ? styles.participantIcon : lightModeStyles.participantIcon} isDark={isDark}/>
              <View>{renderTodayParticipants()}</View>
            </View>
            <Text style={isDark ? styles.subtitleBreakdown : lightModeStyles.subtitleBreakdown}>Participants Breakdown</Text>
            <View style={styles.breakdownContainer}>
              <ParticipantsByMealCard mealTime={'morning'} crowdNumber={renderMorningParticipants()} isDark={isDark}/>
              <ParticipantsByMealCard mealTime={'lunch'} crowdNumber={renderLunchParticipants()} isDark={isDark}/>
              <ParticipantsByMealCard mealTime={'dinner'} crowdNumber={renderDinnerParticipants()} isDark={isDark}/>
            </View>
          </View>
          <View style={styles.todayEventTitleContainer}>
            <Text style={isDark ? styles.title : lightModeStyles.title}>Today's Events</Text>
            <LinkButton onPress={onSeeMorePress} label={'See All'} style={isDark ? styles.linkButton : lightModeStyles.linkButton} />
          </View>
          <View style={styles.carouselContainer}>
            <EventCarousel/>
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
    paddingVertical: 24,
  },
  header: {
    height: 40,
    backgroundColor: colors.neutral.backgroundBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
  },
  profileIcon: {
    width: 28,
    height: 28,
  },
  title: {
    color: colors.primary.primaryPurpleDark,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeightBody,
  },
  participantIcon: {
    alignItems: "center",
  },
  dataVisualizationContainer: {
    height: 200,
    alignSelf: 'center',
  },
  dataBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightBody,
    marginBottom: 15,
    marginTop: 30,
  },
  suggestionContainer: {
    alignSelf: 'center',
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: borderRadius.primary,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    marginTop: 40,
    paddingHorizontal: 13,
    paddingVertical: 16,
  },
  subtitle: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    marginBottom: 20,
    marginTop: 10,
  },
  busyDay: {
    fontFamily: fontFamily.heading,
    fontWeight: '900',
    fontSize: fontSize.subtitle2,
  },
  todayParticipantsContainer: {
    alignSelf: 'center',
    marginTop: 40,
  },
  todayParticipantTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayDate: {
    color: colors.secondaryGreenDark,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
  },
  numberContainer: {
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: borderRadius.primary,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  todayParticipantsNumber: {
    color: colors.neutral.surfaceWhite,
    marginTop: 10,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
  },
  subtitleBreakdown: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    marginTop: 16,
  },
  breakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 6,
  },
  todayEventTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  linkButton: {
    color: colors.accent.accentBlueDark,
    borderBottomColor: colors.accent.accentBlueDark,
  },
  carouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const lightModeStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    height: 40,
    backgroundColor: colors.neutral.backgroundWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle:{
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.backgroundBlack,
  },
  title: {
    color: colors.primary.primaryPurpleLight,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeightBody,
  },
  participantIcon: {
    alignItems: "center",
  },
  dataBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightBody,
    marginBottom: 15,
    marginTop: 30,
  },
  suggestionContainer: {
    alignSelf: 'center',
    backgroundColor: "#F4F4F4",
    borderRadius: borderRadius.primary,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    marginTop: 40,
    paddingHorizontal: 13,
    paddingVertical: 16,
  },
  subtitle: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    marginBottom: 20,
    marginTop: 10,
  },
  busyDay: {
    fontFamily: fontFamily.heading,
    fontWeight: '900',
    fontSize: fontSize.subtitle2,
  },
  todayDate: {
    color: colors.secondaryGreenLight,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
  },
  numberContainer: {
    backgroundColor: "#F4F4F4",
    borderRadius: borderRadius.primary,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  todayParticipantsNumber: {
    color: colors.neutral.surfaceBlack,
    marginTop: 10,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
  },
  subtitleBreakdown: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    marginTop: 16,
  },
  linkButton: {
    color: colors.accent.accentBlueLight,
    borderBottomColor: colors.accent.accentBlueLight,
  },
});

export default HomeScreen;
