import { Alert, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";

import EventCard from "../components/EventCard";
import { getEvents } from "../api/event";
import { mapDarkStyle } from "../styles/maps";

const MapScreen = () => {

  const mapRef = React.useRef<any>(null);
  const carouselRef = useRef<Carousel<{uri: string}>>(null);

  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const ITEM_WIDTH = Dimensions.get('screen').width * 0.8;

  const requestEvents = useQuery('events', () => getEvents());

  const _renderItem = ({ item, }) => {
    return (
      <EventCard
        event={item}
        eventType='actual'
      />
    );
  };

  const renderCarousel = () => {
    return (
      <Carousel
        ref={carouselRef}
        data={requestEvents.data}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={ITEM_WIDTH}
      />
    );
  };

  const renderEventMarkers = () => {
    return requestEvents.data?.map((event, index) => {
      return (
        <Marker
          key={event.id}
          coordinate={{
            latitude: Number(event.location.latitude) ,
            longitude: Number(event.location.longitude),
             }}
          pinColor={"#B687FF"}
          onPress={() => onMarkerPress(index)}
         ></Marker>
      );
    });
  };

  const onMarkerPress = (index) =>  {
    setIsCarouselVisible(true);
    setTimeout(() => {
      carouselRef.current.snapToItem(index);
    }, 100);
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        provider={"google"}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: 49.264131,
          longitude: -123.1569595,
          latitudeDelta: 0.2,
          longitudeDelta: 0.3,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: 49.264131,
            longitude: -123.1569595,
          }}
          onPress={() => Alert.alert("Home", "My location")}
          pinColor={"#90EE90"}
        ></Marker>
        {renderEventMarkers()}
      </MapView>
      { isCarouselVisible ?
        <View style={styles.carousel}>
          {renderCarousel()}
        </View>
        : ""
      }
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default MapScreen;
