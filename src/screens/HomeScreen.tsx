import { Pressable, StyleSheet, Text, TextStyle, View, ScrollView, SafeAreaView } from 'react-native';

import { signOut } from '../auth/user';
import { MainStackNavigationProps } from '../types/navigationTypes';
import { darkMode } from '../styles/colors'
import { fontFamily } from '../styles/fonts'
import { fontSize } from '../styles/fonts'
import { fontWeight } from '../styles/fonts'
import IconText from '../components/IconText';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ParticipantsByMealCard from '../components/ParticipantsByMealCard';
import LinkButton from '../components/LinkButton';

const HomeScreen = ({ navigation }: MainStackNavigationProps<'HomeScreen'>) => {

  const onFullReportPress = () => {
    console.log('fuul report clicked');
  }
  const onSeeSuggestionPress = () => {
    console.log('seesuggestion clicked');
  }
  const onSeeMorePress = () => {
    console.log('seemore clicked');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable> */}
        <Text style={styles.title}>Preview of this week's events</Text>
        <View style={styles.participantsNumberContainer}>
          <IconText icon={require('../assets/icons/participants.png')} text={'total participants:'} />
          <Text style={styles.participantsNumber}>8,425</Text>
        </View>
        <View style={styles.dataVisualizationContainer}>
          <Text>Data Visualization</Text>
          <Text style={styles.date}>Feb01-Feb07</Text>
          <PrimaryButton onClick={onFullReportPress} label={'View Full Report'} />
        </View>
        <View style={styles.suggestionContainer}>
          <Text style={styles.subtitle}>It seems that {<Text style={styles.busyDay}>February 07</Text>} Sunday is the busiest day of this week, would you like to see some promotional opportunities?</Text>
          <SecondaryButton onClick={onSeeSuggestionPress} label={'See Suggestions'} />
        </View>
        <View style={styles.todayParticipantsContainer}>
          <View style={styles.todayParticipantTitle}>
            <Text style={styles.title}>Event Participants for today</Text>
            <Text style={styles.todayDate}>Feb04</Text>
          </View>
          <View style={styles.numberContainer}>
            <IconText icon={require('../assets/icons/participants.png')} text={'Total Participants'} />
            <Text style={styles.todayParticipantsNumber}>8,963</Text>
          </View>
          <Text style={styles.subtitle}>Participants Breakdown</Text>
          <View style={styles.breakdownContainer}>
            <ParticipantsByMealCard mealTime={'morning'} crowdNumber={2453} iconPath={'../assets/icons/morning.png'} />
            <ParticipantsByMealCard mealTime={'lunch'} crowdNumber={1320} iconPath={'../assets/icons/evening.png'} />
            <ParticipantsByMealCard mealTime={'dinner'} crowdNumber={2653} iconPath={'../assets/icons/night.png'} />
          </View>
        </View>
        <View style={styles.todayEventTitleContainer}>
          <Text>Today's Event</Text>
          <LinkButton onClick={onSeeMorePress} label={'See More'}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkMode.netural.backgroundBlack,
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: darkMode.primary.primaryPurpleDark,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeight.body as TextStyle['fontWeight']
  },
  participantsNumber: {
    color: darkMode.secondaryGreenDark,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeight.heading as TextStyle['fontWeight']
  },
  participantsNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  dataVisualizationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    color: darkMode.netural.surfaceWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    fontWeight: fontWeight.body as TextStyle['fontWeight'],
    marginBottom: 15
  },
  suggestionContainer: {
    display: 'flex',
    backgroundColor: darkMode.netural.surfaceBlack,
    width: 356,
    height: 150,
    borderRadius: 22,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    marginTop: 35,
    padding: 10,
    alignItems: 'center'

  },
  subtitle: {
    color: darkMode.netural.surfaceWhite,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeight.subtitle as TextStyle['fontWeight'],
    marginBottom: 20,
    marginTop: 5
  },
  busyDay: {
    fontFamily: fontFamily.heading,
    fontWeight: '900',
    fontSize: fontSize.subtitle2,
  },
  todayParticipantsContainer: {
    display: 'flex',
    marginTop: 30,
  },
  todayParticipantTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  todayDate: {
    color: darkMode.secondaryGreenDark,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2
  },
  numberContainer: {
    display: 'flex',
    backgroundColor: darkMode.netural.surfaceBlack,
    width: 358,
    height: 86,
    borderRadius: 22,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  todayParticipantsNumber: {
    color: darkMode.netural.surfaceWhite,
    marginTop: 10,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2
  },
  breakdownContainer: {
    display: 'flex',
    flexDirection: 'row',

  },
  todayEventTitleContainer: {

  },
});

export default HomeScreen;
