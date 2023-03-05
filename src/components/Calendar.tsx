import React, { useState } from 'react';
import { Text, Pressable, GestureResponderEvent, StyleSheet, View } from 'react-native';

import { WeekCalendar, CalendarProvider } from 'react-native-calendars';

const ITEMS: any[] = [];

const CalendarComponent = (props: {}) => {
  const [day, setDay] = useState('');

  return (
    <CalendarProvider date={new Date().toISOString()}>
      <WeekCalendar onDayPress={day => console.log(day)} firstDay={1} />
    </CalendarProvider>
  );
};

//Style
const styles = StyleSheet.create({});

export default CalendarComponent;
