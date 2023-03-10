import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarProvider, WeekCalendar, CalendarList, ExpandableCalendar } from "react-native-calendars";


const CalendarComponent = (props: {onDayPress: (date: string) => void}) => {


  return (
      <CalendarProvider date={'2023-03-10'}>
        <ExpandableCalendar
        hideDayNames={false}
        onDayPress={() => props.onDayPress("2023-04-06")}
        firstDay={0}
        hideKnob={true}
        closeOnDayPress={false}
        hideExtraDays={true}
        showSixWeeks={true}
        calendarHeight={200}
        calendarWidth={380}
        theme={{
          backgroundColor: '#121214',
          calendarBackground: '#121214',
          selectedDayTextColor: "#90EE90",
          selectedDayBackgroundColor: '#121214',
          arrowColor: "#E6E1E5",
          monthTextColor: "#90EE90",
        }}
        enableSwipeMonths={false}
        />
      </CalendarProvider>
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
