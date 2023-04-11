import { getEvents } from "../api/event";
import { Alert, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useQuery } from "react-query";
import EventCard from "./EventCard";
import { colors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const EventCarousel = (props:{isDark?: boolean}) => {
const navigation = useNavigation();

  const  {data: events = [],} = useQuery("events", () => getEvents(),
  {
    onError: (error: TypeError) => {
      Alert.alert("Error", error.message);
    },
  }
);

const onEventCardPress = (eventId: string) => {
  navigation.navigate("EventDetailsScreen", {eventId: eventId,});
};

const today = new Date().toISOString().slice(0, 10);

const filteredEvents = () => {
  return events.filter((event) => event.dates.date === today);
};

  if (filteredEvents().length === 0 ) {
    return (
      // To-do: Update with animation
      <View>
        <Text style={{color: colors.primary.primaryPurpleDark,}}>No Events today</Text>
      </View>
    );
  } else {
    return (
      <Carousel
      data={filteredEvents()}
        renderItem={({ item,}) => {
          return<EventCard
            key={item.id}
            event={item}
            eventType={"actual"}
            onBookmarkPress={onBookMarkPress}
            onDetail={() => onDetailScreen(item.id)}
            isDark={props.isDark}
          />;

        }
        }
          sliderWidth={390}
          itemWidth={318}
      />
  );
  }
};

export default EventCarousel;
