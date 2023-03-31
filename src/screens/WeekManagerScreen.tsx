import { useState } from "react";
import { useQuery } from "react-query";
import { Alert, ScrollView, FlatList, StyleSheet, Text } from "react-native";

import { getEvents } from "../api/event";

import ReportCard from "../components/ReportCard";
import WeekCalendar from "../components/WeekCalendar";

import { getDate } from "../utils/getDate";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";


//////////////////////////////
const daysOfWeek:string[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];


/////////////////////////////
const formatDate = (dateStr:string)=> {
  let date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short',}) + " " + date.getDate() +", "+ daysOfWeek[date.getDay()];
};



//////////////////// MAIN COMPONENT ////////////////////
const WeekManagerScreen = () => {

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  ////////////////////////////////////////
  const { week, } = getDate();
  const data = [
      { day: "MON", value: 2, participant:3747, },
      { day: "TUE", value: 5, participant:7043,},
      { day: "WED", value: 10, participant:9139,},
      { day: "THU", value: 7, participant:4632,},
      { day: "FRI", value: 16, participant:12139,},
      { day: "SAT", value: 9, participant:8654,},
      { day: "SUN", value:3, participant:5448,}
  ];

  ////////////////////////////////////////
  // requestEvents.data?.forEach((event) => {
  //   for (let i = 0; i < 7; i++) {
  //     data[i].day = formatDate(week[i]);
  //     if (event.dates.date === week[i]) {
  //       data[i].value = data[i].value>0 ? data[i].value+1 : 1;
  //       data[i].participant += event.participants;
  //     }
  //   }
  // });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Weekly Event Preview</Text>
      <WeekCalendar onDaySelection={() => console.log("under development")} isExpanded={false}/>
      <FlatList
        data={data}
        renderItem={({ item, }) =>
          <ReportCard
            date={item.day}
            eventNumber={item.value}
            participantsQty={item.participant}
          />
        }
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
    // fontWeight: 700,
    fontSize: fontSize.heading1,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.neutral.surfaceWhite,
  },
});

export default WeekManagerScreen;
