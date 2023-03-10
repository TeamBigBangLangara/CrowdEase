import { StyleSheet, Text, TextStyle, View, ScrollView, SafeAreaView } from 'react-native';

import { signOut } from '../auth/user';
import { MainStackNavigationProps } from '../types/navigationTypes';
import { colors } from '../styles/colors';
import { fontFamily } from '../styles/fonts';
import { fontSize } from '../styles/fonts';
import { fontWeightTitle, fontWeightSubtitle, fontWeightBody, fontWeightLabel, fontWeightSubtitle2 } from '../styles/fonts';
import IconText from '../components/IconText';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ParticipantsByMealCard from '../components/ParticipantsByMealCard';
import LinkButton from '../components/LinkButton';
import EventCard from '../components/EventCard';
import DataVisualization from '../components/DataVisualization';


// Get the dates
const today = new Date();
const todayString = today.toLocaleString('default', { month: 'long', day: 'numeric', });
const monday = new Date(today);
monday.setDate(today.getDate() - today.getDay() + 1);
const tuesday = new Date(monday);
tuesday.setDate(monday.getDate() + 1);
const wednesday = new Date(today);
const thursday = new Date(wednesday);
thursday.setDate(wednesday.getDate() + 1);
const friday = new Date(thursday);
friday.setDate(thursday.getDate() + 1);
const saturday = new Date(friday);
saturday.setDate(friday.getDate() + 1);
const sunday = new Date(saturday);
sunday.setDate(saturday.getDate() + 1);

const Event = {
  id: "2u63t821hi27",
  name: "Coldplay",
  image: "../assets/eventImage.png",
  dates: {
    date: "12 March",
    time: "12:00 AM",
  },
  category: { name: "music", id: "87362hf", },
  location: {
    longitude: "49.262955",
    latitude: "-123.110409",
  },
  venue: {
    name: "BC place",
    id: "ufc76fcu",
    type: "music",
  },
  address: "238 West Broadway",
  participants: 5000,
};

const HomeScreen = ({ navigation, }: MainStackNavigationProps<'HomeScreen'>) => {

  const onFullReportPress = () => {
    navigation.navigate("ReportScreen");
  };
  const onSeeSuggestionPress = () => {
   navigation.navigate("SuggestionScreen");
  };
  const onSeeMorePress = () => {
    console.log('seemore clicked');
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <View style={styles.container}>
          {/* <Pressable onPress={signOut}>
          <Text>Sign out</Text>
        </Pressable> */}
          <Text style={styles.title}>Preview of this week's events</Text>
          <View style={styles.participantsNumberContainer}>
            <IconText icon={require('../assets/icons/participants.png')} text={'Total participants:'} style={styles.participantIcon} />
            <Text style={styles.participantsNumber}>8,425</Text>
          </View>
          <View style={styles.dataVisualizationContainer}>
            <DataVisualization />
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.date}>{`${monday.toLocaleString('default', { month: 'long', day: 'numeric', })} - ${saturday.toLocaleString('default', { month: 'long', day: 'numeric', })}`}</Text>
            <PrimaryButton onPress={onFullReportPress} label={'View Full Report'} />
          </View>
          <View style={styles.suggestionContainer}>
            <Text style={styles.subtitle}>It seems that {<Text style={styles.busyDay}>March 12</Text>} Sunday is the busiest day of this week, would you like to see some promotional opportunities?</Text>
            <SecondaryButton onPress={onSeeSuggestionPress} label={'See Suggestions'} />
          </View>
          <View style={styles.todayParticipantsContainer}>
            <View style={styles.todayParticipantTitle}>
              <Text style={styles.title}>Event Participants for today</Text>
              <Text style={styles.todayDate}>{todayString}</Text>
            </View>
            <View style={styles.numberContainer}>
              <IconText icon={require('../assets/icons/participants.png')} text={'Total Participants'} style={styles.participantIcon} />
              <Text style={styles.todayParticipantsNumber}>8,963</Text>
            </View>
            <Text style={styles.subtitle}>Participants Breakdown</Text>
            <View style={styles.breakdownContainer}>
              <ParticipantsByMealCard mealTime={'morning'} crowdNumber={2453} />
              <ParticipantsByMealCard mealTime={'lunch'} crowdNumber={1320} />
              <ParticipantsByMealCard mealTime={'dinner'} crowdNumber={2653} />
            </View>
          </View>
          <View style={styles.todayEventTitleContainer}>
            <Text style={styles.title}>Today's Event</Text>
            <LinkButton onPress={onSeeMorePress} label={'See More'} style={styles.linkButton} />
          </View>
          <EventCard
            event={Event}
            onBookmarkPress={() => {
              console.log('click');
            }}
            eventType='music' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.netural.backgroundBlack,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.primary.primaryPurpleDark,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeightBody,
  },
  participantsNumber: {
    color: colors.secondaryGreenDark,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightTitle,
  },
  participantIcon: {
    alignItems: "center",
  },
  participantsNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
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
    color: colors.netural.surfaceWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    fontWeight: fontWeightBody,
    marginBottom: 15,
  },
  suggestionContainer: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: colors.netural.surfaceBlack,
    width: 356,
    height: 150,
    borderRadius: 22,
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
    marginTop: 35,
    padding: 10,
    alignItems: 'center',
  },
  subtitle: {
    color: colors.netural.surfaceWhite,
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
    display: 'flex',
    alignSelf: 'center',
    marginTop: 30,
  },
  todayParticipantTitle: {
    display: 'flex',
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
    display: 'flex',
    backgroundColor: colors.netural.surfaceBlack,
    width: 358,
    height: 86,
    borderRadius: 22,
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
    marginBottom: 20,
  },
  todayParticipantsNumber: {
    color: colors.netural.surfaceWhite,
    marginTop: 10,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
  },
  breakdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayEventTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  linkButton: {
    color: colors.accent.accentBlueDark,
    borderBottomColor: colors.accent.accentBlueDark,
  },
});

export default HomeScreen;
