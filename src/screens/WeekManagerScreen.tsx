import { useState } from "react";
import { useQuery } from "react-query";
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import { getEvents } from "../api/event";

import ReportCard from "../components/ReportCard";
import WeekCalendar from "../components/WeekCalendar";

import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { addDays, format, startOfWeek } from "date-fns";

//////////////////// FUNCTIONS ////////////////////
//getWeekDays
const getWeekDays = (selectedWeekStartDay: Date): Date[] => {
  const firstDayOfWeek = startOfWeek(selectedWeekStartDay, {weekStartsOn: 1,});
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = addDays(firstDayOfWeek, i);
    daysOfWeek.push(dayOfWeek);
  }
  return daysOfWeek;
};


//////////////////// MAIN COMPONENT ////////////////////
const WeekManagerScreen = () => {
  /////========= States
  const [selectedWeekStartDay, setSelectedWeekStartDay] = useState<Date>(new Date());

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  /////========= Handlers
  const weekCalendarArrowHandler = (newSelectedWeekStartDay: Date) => {
    setSelectedWeekStartDay(newSelectedWeekStartDay);
  };

  //Getting a list of objects with all info required for the ReportCard, for each day of the week
  const weekdays = getWeekDays(selectedWeekStartDay);
  const weekDayList = weekdays.map( weekday => {
    return (
      { day: weekday,
        dayWithFormat: format(weekday, "MMM dd, ccc"),
        eventsNumber: 0,
        eventsParticipants: 0,
      }
    );
  });

  //For each event, we find the corresponding weekDayObject. Add +1 to eventNumber for that day, and increase participants.
  requestEvents.data?.forEach((event) => {
    //Note: Comparison is made with dates formatted in YYYY-MM-DD
    const dateOfEvent = weekDayList.find(weekDayObject => format(weekDayObject.day, "yyyy-MM-dd") === event.dates.date);
    if(dateOfEvent != undefined){
      dateOfEvent.eventsNumber++;
      dateOfEvent.eventsParticipants += event.participants;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Weekly Event Preview</Text>
      <WeekCalendar
      onDaySelection={() => console.log("under development")}
      onWeekSelection={weekCalendarArrowHandler}
      daysVisible={false}
      />
      <FlatList
        data={weekDayList}
        renderItem={({ item, }) =>
          <ReportCard
            date={item.dayWithFormat}
            eventNumber={item.eventsNumber}
            participantsQty={item.eventsParticipants}
          />
        }
        ItemSeparatorComponent={() => <View style={{height: 18,}} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  screenTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading1,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.neutral.surfaceWhite,
  },
});

export default WeekManagerScreen;
