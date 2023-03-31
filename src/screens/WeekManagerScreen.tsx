import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { getEvents } from "../api/event";
import { useQuery } from "react-query";
import { getDate } from "../utils/getDate";
import ReportCard from "../components/ReportCard";
import { colors } from "../styles/colors";

const daysOfWeek:string[] = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

const formatDate = (dateStr:string)=> {
  let date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short',}) + " " + date.getDate() +", "+ daysOfWeek[date.getDay()];
};

const WeekManagerScreen = () => {
  const { week, } = getDate();
  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );
  const data = [
      { day: "MON", value: 0, participant:0, },
      { day: "TUE", value: 0, participant:0,},
      { day: "WED", value: 0, participant:0,},
      { day: "THU", value: 0, participant:0,},
      { day: "FRI", value: 0, participant:0,},
      { day: "SAT", value: 0, participant:0,},
      { day: "SUN", value: 0, participant:0,}
  ];

  requestEvents.data?.forEach((event) => {
    for (let i = 0; i < 7; i++) {
      data[i].day = formatDate(week[i]);
      if (event.dates.date === week[i]) {
        data[i].value = data[i].value>0 ? data[i].value+1 : 1;
        data[i].participant += event.participants;
      }
    }
  });
  return (
    <>
    <View style={styles.container}>
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
    </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});

export default WeekManagerScreen;
