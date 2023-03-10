import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarProvider, WeekCalendar, CalendarList } from "react-native-calendars";

const CalendarComponent = (props: {onDayPress: (date: string) => void}) => {

  return (
    <View style={styles.calendar}>
      <CalendarProvider style={{backgroundColor: 'black',}} date={new Date().toISOString() } >
        <WeekCalendar current={new Date().toISOString()} onDayPress={() => props.onDayPress("2023-04-06")} firstDay={1} pagingEnabled={false} />
      </CalendarProvider>
    </View>
  );
  };
//Style
const styles = StyleSheet.create({
  calendar: {
    height:55,
    marginVertical: 24,
  },
});

export default CalendarComponent;
