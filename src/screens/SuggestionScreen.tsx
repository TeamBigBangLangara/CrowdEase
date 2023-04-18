import { useQuery } from "react-query";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { ReportStackNavigationProps } from "../types/navigationTypes";

import { format } from "date-fns";

import DayEventCard from "../components/DayEventCard";
import ParticipantsByCategory from "../components/ParticipantsByCategory";
import PrimaryButton from "../components/PrimaryButton";

import { getEvents } from "../api/event";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
// import { getEvents } from "../api/bigBangAPI/JsonEvents";

const SuggestionScreen = ({ navigation, }: ReportStackNavigationProps<'SuggestionScreen'>) => {
  /////========= States
  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  /////========= Handlers
  const onReturnButtonPress = () => {
    navigation.navigate('WeekManagerScreen');
  };

  //Current Day
  const currentDay = new Date();

  //Array of Events of the Day
  const eventsOfCurrentDay: Event[] = [];

  //Array of eventsCategories
  const eventsCategories = [
    {name: 'Music', participants: 0,},
    {name: 'Sports', participants: 0,},
    {name: 'Shows', participants: 0,},
    {name: 'Festivals', participants: 0,},
    {name: 'Business', participants: 0,},
    {name: 'Other', participants: 0,}
  ];

    //(Day)For each event, we find the corresponding category and increase participants.
    requestEvents.data?.forEach((event) => {
      if(event.dates.date === format(currentDay, "yyyy-MM-dd")){
        eventsOfCurrentDay.push(event);
        const eventCategory = eventsCategories.find(categoryObject => categoryObject.name === event.category.name);
        if(eventCategory != undefined){
          eventCategory.participants += event.participants;
        }
      }
      }
    );

  //Sorting Events from most participants to lower. This sort logic returns a sorted array using participants property.
  eventsOfCurrentDay.sort((a,b) => b.participants - a.participants);

  //Calculating percentage of most-participants-event over its category total.
  const moreParticipantsEventCategoryTotal = eventsCategories.find(categoryObject => categoryObject.name === eventsOfCurrentDay[0].category.name)?.participants;
  const moreParticipantsEventOverCategoryTotal = Math.round(eventsOfCurrentDay[0].participants *100 / moreParticipantsEventCategoryTotal);

  //Getting the category with most participants (This means all events need to be added)
  const participantsArray = eventsCategories.map((categoryObject) => categoryObject.participants);
  const participantsArrayaMaxValue = Math.max(...participantsArray);
  const moreParticipantsCategory = eventsCategories.find(categoryObject => categoryObject.participants === participantsArrayaMaxValue);

  //Calculating total participants. Reduce passes the partialSum Value (starts with 0 in this example), the incremental a (each value of the array), and the initial value 0;
  const totalParticipants = participantsArray.reduce((partialSum, a) => partialSum + a, 0);

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Let's break {format(currentDay, 'MMM dd')} down, get ready to serve {moreParticipantsCategory?.name} lovers</Text>
        <View style={{flex: 1,}}>
          <Text style={styles.sectionTitle}>
          {format(currentDay, 'MMM dd, yyyy')}
          </Text>
          <ParticipantsByCategory
            participants={totalParticipants}
            percentage={50}
            musicQty={eventsCategories.find(categoryObject => categoryObject.name === 'Music').participants}
            sportQty={eventsCategories.find(categoryObject => categoryObject.name === 'Sports').participants}
            showsQty={eventsCategories.find(categoryObject => categoryObject.name === 'Shows').participants}
            festivalsQty={eventsCategories.find(categoryObject => categoryObject.name === 'Festivals').participants}
            businessQty={eventsCategories.find(categoryObject => categoryObject.name === 'Business').participants}
            otherQty={eventsCategories.find(categoryObject => categoryObject.name === 'Other').participants}
          />
        </View>
        <View style={{flex: 1,}}>
          <Text style={styles.sectionTitle}>
            Major Event of the day
          </Text>
          <DayEventCard event={eventsOfCurrentDay[0]} percentage={moreParticipantsEventOverCategoryTotal}/>
        </View>
        <View style={{alignItems: 'center',}}>
          <PrimaryButton onPress={onReturnButtonPress} label={"Go to the week preview"} isDark={true}/>
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 18,
    paddingVertical: 25,
    rowGap: 32,
  },
  screenTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading1,
    lineHeight: 36,
    textAlign: 'left',
    color: colors.neutral.surfaceWhite,
  },
  sectionTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.subtitle1,
    lineHeight: 36,
    textAlign: 'left',
    color: colors.neutral.surfaceWhite,
  },
});

export default SuggestionScreen;
