import { Alert, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { getEvents } from "../api/event";

import EventCard from "../components/EventCard";
import { getUser } from "../auth/user";
import { Rating } from "types/types";
import { getEventRatedByUser } from "../api/bigBangAPI/rating";
import { colors } from "../styles/colors";

const PastEventScreen = () => {
  const requestUser = useQuery("user", () => getUser());

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    });

  const requestEventRatedByUser = useQuery("userRating", () => {
    return getEventRatedByUser(requestUser.data!.uid);
    },
    {
      onSuccess: () => {
        mergeRatingAndEvents();
      },
      enabled: !!requestUser.data?.uid && requestEvents.isSuccess,
    });


  const mergeRatingAndEvents = () => {
    if (requestEvents.data && requestEventRatedByUser.data) {
      return requestEvents.data.map((event) => {
        const rating = requestEventRatedByUser.data.find((rating: Rating) => rating.event_id === event.id);
        if (rating) {
          return {
            ...event,
            rate: rating.rate,
            ratingID: rating._id,
          };
        }
        return event;
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <FlatList
        data={mergeRatingAndEvents()}
        renderItem={({ item, }) =>
          <EventCard
            key={item.id}
            event={item}
            eventType={"past"}
            userId={requestUser.data!.uid}
          />
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
