import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarProvider, WeekCalendar, CalendarList } from "react-native-calendars";


const CalendarComponent = () => {


  return (
      <CalendarProvider style={{backgroundColor: 'black',}} date={new Date().toISOString() } >
        <WeekCalendar current={'2023-03-09'} onDayPress={(day) => console.log(day)} firstDay={1} pagingEnabled={false} style={{backgroundColor: 'black',}}/>
      </CalendarProvider>
  );

  };

//Style
const styles = StyleSheet.create({});

export default CalendarComponent;
