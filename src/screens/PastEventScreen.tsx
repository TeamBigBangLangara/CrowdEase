import { Alert, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useQuery } from "react-query";
import { getEvents } from "../api/event";


import EventCard from "../components/EventCard";
import { getUser } from '../auth/user';
import { LoggedUser } from "types/types";
import { useEffect, useState } from "react";
import { getRating } from "../api/bigBangAPI/rating";
import { colors } from "../styles/colors";

const PastEventScreen = () => {
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: '', email: '', });

  const requestEvents = useQuery("events", () => getEvents(),

    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    });

  const requestUserRating = useQuery('getUserRating', () => {
    return getRating(userInfo.uid);
  }, {
    onSuccess: (data) => {
      mergeRatingAndEvents();
    },
    enabled: !!userInfo.uid && requestEvents.isSuccess,
  }
  );

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUserInfo(user);

      const rating = await getRating(user.uid);
    }
    fetchUser();
  }, []);

  const mergeRatingAndEvents = () => {
    if (requestEvents.data && requestUserRating.data) {
      const mergedEvents = requestEvents.data.map((event) => {
        const rating = requestUserRating.data.find((rating: any) => rating.event_id === event.id);
        if (rating) {
          return {
            ...event,
            rate: rating.rate,
            ratingID: rating._id,
          };
        }
        return event;
      });

      return mergedEvents;
    }
  };

  const mergedEvents = mergeRatingAndEvents();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={mergedEvents}
        renderItem={({ item, }) =>
          <EventCard
            key={item.id}
            event={item}
            eventType={"past"}
            userID={userInfo?.uid}
            rate={item.rate}
            ratingID={item.ratingID} />
        }
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.netural.backgroundBlack,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});

export default PastEventScreen;
