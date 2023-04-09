import { addDays, format, isSameDay, startOfWeek, subDays } from "date-fns";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { fontFamily, fontWeightSubtitle2 } from "../styles/fonts";

import LinearGradient from "react-native-linear-gradient";
import { WeekDay } from "../types/types";

//////////////////// TYPES ////////////////////

type Props = {
  onWeekSelection: (value: Date) => void;
  onDaySelection: (value: string) => void;
  daysVisible: boolean,
};

//////////////////// FUNCTIONS ////////////////////

//getWeekDays
const getWeekDays = (selectedWeekStartDay: Date): WeekDay[] => {
  const firstDayOfWeek = startOfWeek(selectedWeekStartDay, {weekStartsOn: 1,});
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = addDays(firstDayOfWeek, i);
    daysOfWeek.push({
      date: dayOfWeek,
      dayName: format(dayOfWeek, 'EEE'),
      dayNumber: format(dayOfWeek, 'dd'),
    });
  }
  return daysOfWeek;
};

//////////////////// MAIN COMPONENT ////////////////////

const WeekCalendar = ({onDaySelection, onWeekSelection, daysVisible = true,}: Props) => {

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedWeekStartDay, setSelectedWeekStartDay] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1, }));

  //////////////////// VARIABLES ////////////////////
  //WeekDays
  const weekdays = getWeekDays(selectedWeekStartDay);

  //Week Selector Text
  const monthAndFirstDayOfWeek = selectedWeekStartDay.toLocaleDateString('en-CA', { month: 'short', day: '2-digit',});
  const monthAndLastDayOfWeek = addDays(selectedWeekStartDay,6).toLocaleDateString('en-CA', { month: 'short', day: '2-digit',});
  const weekRangeText = `${monthAndFirstDayOfWeek}   -   ${monthAndLastDayOfWeek}`;

  //////////////////// HANDLERS ////////////////////
  //Day Selection Handler
  const daySelectionHandler = (pressedDateOfWeek:Date) => {
    onDaySelection(format(pressedDateOfWeek, 'yyyy-MM-dd'));
    setSelectedDay(pressedDateOfWeek);
  };

  //Week Selection Handler
  const weekSelectionHandler = (direction: string) => {
    if (direction === 'left') {
      onWeekSelection(subDays(selectedWeekStartDay,7));
      setSelectedWeekStartDay(subDays(selectedWeekStartDay,7));
    } else {
      onWeekSelection(addDays(selectedWeekStartDay,7));
      setSelectedWeekStartDay(addDays(selectedWeekStartDay,7));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekSelectorContainer}>
        <Pressable onPress={() => weekSelectionHandler('left')}>
          <Image source={require('../assets/icons/arrowLeft.png')} />
        </Pressable>
        <Text style={styles.weekRangeText}>{weekRangeText}</Text>
        <Pressable onPress={() => weekSelectionHandler('right')}>
          <Image source={require('../assets/icons/arrowRight.png')} />
        </Pressable>
      </View>
      {daysVisible &&
      <View style={styles.daySelectorContainer}>
      {weekdays.map((weekDay) => {
        return (
          <LinearGradient
            colors={colors.primary.gradientDark.colors}
            start={colors.primary.gradientDark.start}
            end={colors.primary.gradientDark.end}
            style={[styles.linearGradient, isSameDay(weekDay.date, selectedDay) && {padding: 2,}]}
          >
            <Pressable
              onPress={() => daySelectionHandler(weekDay.date)}
              style={styles.weekDayItem} key={weekDay.dayName}>
              <Text style={[styles.weekDayName, isSameDay(weekDay.date, selectedDay) && styles.selectedDay]}>{weekDay.dayName}</Text>
              <Text style={[styles.weekDayNumber, isSameDay(weekDay.date, selectedDay) && styles.selectedDay]}>{weekDay.dayNumber}</Text>
            </Pressable>
          </LinearGradient>
        );
      })}
      </View>}
    </View>
  );
  };

//Style
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    rowGap: 10,
  },
  weekSelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  daySelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekRangeText: {
    fontSize: 16,
    fontFamily: fontFamily.body,
    color: colors.secondaryGreenDark,
  },
  weekDayItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 45,
    width: 35,
    borderRadius: 8,
    backgroundColor: colors.neutral.backgroundBlack,
  },
  weekDayName: {
    fontSize: 14,
    fontFamily: fontFamily.body,
    color: colors.neutral.surfaceWhite,
    textAlign: 'center',
  },
  weekDayNumber: {
    fontSize: 14,
    fontFamily: fontFamily.body,
    color: 'white',
    textAlign: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedDay: {
    color: colors.secondaryGreenDark,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightSubtitle2,
  },
});

export default WeekCalendar;
