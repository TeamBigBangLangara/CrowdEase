import React, { useState } from "react";
import { useQuery } from "react-query";
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getEvents } from "../api/bigBangAPI/JsonEvents";
import { format } from "date-fns";

import SearchForm from "../components/SearchForm";
import WeekCalendar from "../components/WeekCalendar";
import EventCard from "../components/EventCard";
import FilterCategory from "../components/FilterCategory";

import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";

import { getUser } from "../auth/user";
import { Bookmark, LoggedUser } from "types/types";
import { fetchBookmarks } from "../api/bigBangAPI/bookmark";
import { EventsStackNavigationProps } from "../types/navigationTypes";

export type TypeCategoryFilter = {
  category: string,
  isActive: boolean,
};

const EventScreen = ({ navigation,}: EventsStackNavigationProps<"EventScreen">) => {

  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(format(new Date, "yyyy-MM-dd"));
  const [categoryFilterArray, setCategoryFilterArray] = useState<TypeCategoryFilter[]>(
    [
      {category: "Sports", isActive: false,},
      {category: "Shows", isActive: false,},
      {category: "Music", isActive: false,},
      {category: "Festivals", isActive: false,},
      {category: "Business", isActive: false,},
      {category: "Other", isActive: false,},
      {category: "500m", isActive: false,},
      {category: "1km", isActive: false,},
      {category: "3km", isActive: false,}
    ]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: "", email: "", });

  //Check if all filters are off (false). Returns true if all false, and false if any of the categories is active.
  const allFilterAreOff = categoryFilterArray.every(filterObject => {
    return !filterObject.isActive;
  });

  //Get user Data
  useQuery("getUserData", getUser, {
      onSuccess: (data: LoggedUser) => {
        setUserInfo(data);
      },
    }
  );

  //Get events
  const requestEvents = useQuery("events", () => getEvents(),
    {
      select: (events) => {
        return events
        //Search filter
        .filter((event) => {
          return searchFilter ? event.name.toLowerCase().includes(searchFilter.toLowerCase()) : true;
        })
        //Date filter. Note: Comparison is made with dates formatted in YYYY-MM-DD
        .filter((event) => {
          return dateFilter ? event.dates.date === dateFilter : true;
        })
        //Category filter
        .filter((event) => {
          //If all filters are off, should return all events.
          if(allFilterAreOff){
            return event;
          }
          return categoryFilterArray.find(filterObject => filterObject.category === event.category.name)?.isActive && event;
        });
      },
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  //Bookmark logic
  const requestUserBookmarks = useQuery("bookmarks", () => { return fetchBookmarks(userInfo.uid);
    }, {
      enabled: !!userInfo.uid && requestEvents.isSuccess,
    }
  );

  const mergeBookmarkAndEvents = () => {
    if (requestEvents.data && requestUserBookmarks.data) {
       return requestEvents.data.map((event) => {
        const bookmark = requestUserBookmarks.data.find((bookmark: Bookmark) => bookmark.event_id === event.id);
        if (bookmark) {
          return {
            ...event,
            bookmarkId: bookmark._id,
          };
        }
        return event;
      });
    }
  };

  const daySelectionHandler = (date: string) => {
    setDateFilter(date);
  };

  const onApplyFilterHandler = (newCategoryFilterArray: TypeCategoryFilter[]) => {
    setCategoryFilterArray(newCategoryFilterArray);
  };

  const onSearchTextChanged = (searchText: string) => {
    setSearchFilter(searchText);
  };

  const onEventCardPress = (eventId: string) => {
    navigation.navigate("EventDetailsScreen", { eventId: eventId, });
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
              onEventCardPress={() => onEventCardPress(item.id!)}
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
              onEventCardPress={() => onEventCardPress(item.id!)}
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
        <WeekCalendar
          onDaySelection={daySelectionHandler}
          daysVisible={true}/>
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
        categoryFilterArray={categoryFilterArray}
        onApplyFilterPress={onApplyFilterHandler}
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
