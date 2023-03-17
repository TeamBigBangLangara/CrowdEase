import React, { useState, useEffect } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getEvents } from "../api/event";
import {  useQuery } from "react-query";

import SearchForm from "../components/SearchForm";
import EventCard from "../components/EventCard";
import FilterCategory from "../components/FilterCategory";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";
import Calendar from "../components/Calendar";
import { getUser } from '../auth/user';
import { LoggedUser } from "types/types";
import { getBookmarks } from "../api/bigBangAPI/bookmark";

const EventScreen = () => {

  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo]  = useState<LoggedUser>({uid: '',email: '',});
  // let userinfo:  any;
  useEffect( () => {
    async function fetchUser() {
      const user = await getUser();
      setUserInfo(user);
      console.log(user.uid);

      const bookmarks = await getBookmarks(user.uid);
      console.log(bookmarks);

    }
    fetchUser();
  }, []);

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
            userID= {userInfo?.uid}
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
            userID= {userInfo?.uid}
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
      <Calendar onDayPress={onHandleData}/>
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
