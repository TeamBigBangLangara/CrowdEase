import React, { useState } from "react";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getEvents } from "../api/event";
import { useQuery } from "react-query";

import SearchForm from "../components/SearchForm";
import EventCard from "../components/EventCard";
import FilterCategory from "../components/FilterCategory";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";
import WeekCalendar from "../components/WeekCalendar";
import { getUser } from "../auth/user";
import { Bookmark, LoggedUser } from "types/types";
import { fetchBookmarks } from "../api/bigBangAPI/bookmark";

const EventScreen = () => {

  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  //For simplification, only 1 category is passed for filtering.
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: "", email: "", });

  useQuery("getUserData", getUser, {
      onSuccess: (data) => {
        setUserInfo(data);
      },
    }
  );


  const requestEvents = useQuery("events", () => getEvents(),
    {
      select: (events) => {
        return events.filter((event) => {
          return searchFilter ? event.name.toLowerCase().includes(searchFilter.toLowerCase()) : true;
        })
        .filter((event) => {
          return dateFilter ? event.dates.date === dateFilter : true;
        })
        .filter((event) => {
          return categoryFilter ? event.category.name === categoryFilter : true;
        });
      },
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const onCategoryPress = (category: string) => {
    console.log(category);
    setCategoryFilter(category);
  }

  const requestUserBookmarks = useQuery("getUserBookmarks", () => {
      return fetchBookmarks(userInfo.uid);
    }, {
      enabled: !!userInfo.uid && requestEvents.isSuccess,
    }
  );


  const mergeBookmarkAndEvents = () => {
    if (requestEvents.data && requestUserBookmarks.data) {
      const mergedEvents = requestEvents.data.map((event) => {
        const bookmark = requestUserBookmarks.data.find((bookmark: Bookmark) => bookmark.event_id === event.id);
        if (bookmark) {
          return {
            ...event,
            bookmarkId: bookmark._id,
          };
        }
        return event;
      });
      return mergedEvents;
    }
  };

  const onSearchTextChanged = (searchText: string) => {
    setSearchFilter(searchText);
  };

  const daySelectionHandler = (date: string) => {
    setDateFilter(date);
  };

  const renderEvents = () => {
    if (searchFilter) {
      return (
        <FlatList
          data={mergeBookmarkAndEvents()}
          renderItem={({ item, }) =>
            <EventCard
              key={item.id}
              event={item}
              eventType={"actual"}
              userId={userInfo?.uid}
              bookmarkId={item.bookmarkId}
            />
          }
        />
      );
    } else {
      return (
        <FlatList
          data={mergeBookmarkAndEvents()}
          renderItem={({ item, }) =>
            <EventCard
              key={item.id}
              event={item}
              eventType={"actual"}
              userId={userInfo?.uid}
              bookmarkId={item.bookmarkId}
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
      <WeekCalendar onDaySelection={daySelectionHandler} isExpanded={true}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{requestEvents.data?.length} event(s)</Text>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/icons/layout1.png")} />
          <View style={styles.separator}></View>
          <Image source={require("../assets/icons/layout2.png")} />
        </View>
      </View>
      {renderEvents()}
      <FilterCategory
        visible={modalVisible}
        onClosePress={() => setModalVisible(false)}
        onPressCategory={onCategoryPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.neutral.backgroundBlack,
    paddingTop: 14,
  },
  eventList: {
    marginBottom: 30,
  },
  titleContainer: {
    backgroundColor: colors.neutral.backgroundBlack,
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
    borderColor: colors.neutral.backgroundWhite,
    marginHorizontal: 8,
  },
});

export default EventScreen;
