import React, { useState } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getEvents } from "../api/event";
import {  useQuery } from "react-query";

import SearchForm from "../components/SearchForm";
import EventCard from "../components/EventCard";
import FilterCategory from "../components/FilterCategory";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";
import WeekCalendar from "../components/WeekCalendar";

const EventScreen = () => {

  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);


  //TesDate
  const [date, setDate] = useState(new Date());



  const requestEvents = useQuery("events", () => getEvents(),
    {
      select: (events) => { return events.filter((event) => {
        return searchFilter ? event.name.toLowerCase().includes(searchFilter.toLowerCase()) : true;
        })
        .filter((event) => {
          return dateFilter ? event.dates.date === dateFilter : true;
        });
      },
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const onSearchTextChanged = (searchText: string) => {
    setSearchFilter(searchText);
  };

  const onBookMarkPress = () => {
    Alert.alert("here", "Book Mark pressed");
  };

  const onHandleData = (date: string) => {
    setDateFilter(date);
  };

  const renderEvents = () => {
  if (searchFilter) {
    return (
      <FlatList
        data={requestEvents.data}
        renderItem={({ item, }) =>
          <EventCard
            key={item.id}
            event={item}
            eventType={"actual"}
            onBookmarkPress={onBookMarkPress}
          />
        }
      />
    );} else {
    return (
      <FlatList
        data={requestEvents.data}
        renderItem={({ item,}) =>
          <EventCard
            key={item.id}
            event={item}
            eventType={"actual"}
            onBookmarkPress={onBookMarkPress}
          />
        }
      />
    );
  }
  };

  return (
    <ScrollView style={styles.container}>
      <SearchForm
        onChangeText={(keyword: string) => onSearchTextChanged(keyword)}
        onFilterPress={() => {
          setModalVisible(true);
        }}
      />
      <WeekCalendar date={date} onChange={(newDate) => setDate(newDate)} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{requestEvents.data?.length} event(s)</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/icons/layout1.png')} />
          <View style={styles.separator} ></View>
          <Image source={require('../assets/icons/layout2.png')} />
        </View>
      </View>
      {renderEvents()}
      <FilterCategory
        visible={modalVisible}
        onClosePress={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.netural.backgroundBlack,
    paddingTop: 14,
  },
  titleContainer: {
    backgroundColor: colors.netural.backgroundBlack,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 24,
  },
  title: {
    fontSize: fontSize.subtitle1,
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    color: colors.primary.primaryPurpleDark,
  },
  imageContainer: {
    flexDirection: "row",
  },
  separator: {
    borderRightWidth: 2,
    borderColor: colors.netural.backgroundWhite,
    marginHorizontal: 8,
  },
});

export default EventScreen;
