import { getEvents } from '../api/event';
import { Alert, } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useQuery } from 'react-query';
import EventCard from './EventCard';

const EventCarousel = () => {

  const  {data: events = []} = useQuery("events", () => getEvents(),
  {
    onError: (error: TypeError) => {
      Alert.alert("Error", error.message);
    },
  }
);

const today = new Date().toISOString().substr(0, 10);


const filteredEvents = events.filter(
  (event) => event.dates.date === today
);

const onBookMarkPress = () => {
  Alert.alert("here", "Book Mark pressed");
};

  return (
      <Carousel
      data={filteredEvents}
        renderItem={({ item,}) =>
          <EventCard
            key={item.id}
            event={item}
            eventType={"actual"}
            onBookmarkPress={onBookMarkPress}
          />
        }
          sliderWidth={390}
          itemWidth={353}
      />
  );
}

export default EventCarousel