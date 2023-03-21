import {addDays, subDays, format, getDate, getMonth, isSameDay, startOfWeek} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import { colors } from "../styles/colors";


//////////////////// TYPES ////////////////////

type Props = {
  onDaySelection: (value: Date) => void;
};

type WeekDay = {
  date: Date;
  dayName: string;
  dayNumber: number;
};


//////////////////// FUNCTIONS ////////////////////

//getWeekDays
export const getWeekDays = (selectedWeekStartDay: Date): WeekDay[] => {
  const firstDayOfWeek = startOfWeek(selectedWeekStartDay, {weekStartsOn: 1,});
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = addDays(firstDayOfWeek, i);
    daysOfWeek.push({
      date: dayOfWeek,
      dayName: format(dayOfWeek, 'EEE'),
      dayNumber: getDate(dayOfWeek),
    });
  }
  return daysOfWeek;
};

//daySelection
export const daySelection = () => {

};

//////////////////// MAIN COMPONENT ////////////////////

const WeekCalendar = ({onDaySelection,}: Props) => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedWeekStartDay, setSelectedWeekStartDay] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1, }));

  //WeekDays
  const weekdays = getWeekDays(selectedWeekStartDay);

  //Week Selector Text
  const monthAndFirstDayOfWeek = selectedWeekStartDay.toLocaleDateString('en-CA', { month: 'short', day: '2-digit',});
  const monthAndLastDayOfWeek = addDays(selectedWeekStartDay,6).toLocaleDateString('en-CA', { month: 'short', day: '2-digit',});
  const weekRangeText = `${monthAndFirstDayOfWeek}   -   ${monthAndLastDayOfWeek}`;

  return (
    <View style={styles.container}>
      
      <View style={styles.weekSelectorContainer}>
        <Pressable onPress={() => setSelectedWeekStartDay(subDays(selectedWeekStartDay,7))}>
          <Image source={require('../assets/icons/arrowLeft2x.png')} />
        </Pressable>

        <Text style={styles.weekRangeText}>{weekRangeText}</Text>

        <Pressable onPress={() => setSelectedWeekStartDay(addDays(selectedWeekStartDay,7))}>
          <Image source={require('../assets/icons/arrowRight2x.png')} />
        </Pressable>
      </View>

      <View style={styles.daySelectorContainer}>
      {weekdays.map((weekDay) => {
        const textStyles = [styles.label];
        const touchable = [styles.touchable];

        const sameDay = isSameDay(weekDay.date, selectedDay);
        if (sameDay) {
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }

        return (
            <View style={styles.weekDayItem} key={weekDay.dayName}>
              <TouchableOpacity
                onPress={() => onDaySelection(weekDay.date)}
                style={touchable}>
                <Text style={styles.weekDayName}>{weekDay.dayName}</Text>
                <Text style={styles.weekDayNumber}>{weekDay.dayNumber}</Text>
              </TouchableOpacity>
            </View>


        );
      })}
      </View>
    </View>
  );
  };

  
//Style
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
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
  },

  weekRangeText: {
    fontSize: 20,
    color: colors.secondaryGreenDark,
  },

  weekDayItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  weekDayName: {
    fontSize: 14,
    color: colors.netural.surfaceWhite,
    textAlign: 'center',
  },

  weekDayNumber: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },

  selectedDay: {
    color: 'white',
  },

  touchable: {
    borderRadius: 2,
    height: 35,
    width: 35,
  },

  selectedTouchable: {
    backgroundColor: 'black',

  },


});

export default WeekCalendar;
