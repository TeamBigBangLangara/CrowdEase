import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import MapView, { Heatmap, Marker } from "react-native-maps";
import { useQuery } from "react-query";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";

import EventCard from "../components/EventCard";
import { getEvents } from "../api/event";
import { mapDarkStyle } from "../styles/maps";
import { Event, Location } from "../types/types";
import { getCrowd } from "../api/footTrackAPI";
import { heatMap } from "../model/mapData";

const MapScreen = () => {

  const mapRef = React.useRef<any>(null);
  const carouselRef = useRef<Carousel<{uri: string}>>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const ITEM_WIDTH = Dimensions.get('screen').width * 0.8;

  const requestEvents = useQuery('events', () => getEvents());

  const _renderItem = ({ item, }: {item: Event}) => {
    return (
      <EventCard
        event={item}
        eventType='actual'
      />
    );
  };


  useEffect(() => {getCrowd();}, []);

  const renderCarousel = () => {
    return (
      <Carousel
        ref={carouselRef as any}
        data={requestEvents.data || []}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => {
          const event = requestEvents.data![index];
          setSelectedMarker(event.location);
        }}
  />
    );
  };

  const renderEventMarkers = () => {
    return requestEvents.data?.map((event, index) => {
      let isSelected = false;
      if (selectedMarker) {
        isSelected = event.location.latitude === selectedMarker.latitude &&
        event.location.longitude === selectedMarker.longitude;
      }
      return (
        <Marker
          zIndex={selectedMarker ? 1000 : 0}
          key={event.id}
          coordinate={{
            latitude: Number(event.location.latitude),
            longitude: Number(event.location.longitude),
             }}
          pinColor={isSelected ? "green" : "#B687FF"}
          onPress={() => {
            onMarkerPress(index, event.location);
          }}
         >
        </Marker>
      );
    });
  };

  const onMarkerPress = (index: number, coordinate: Location) =>  {
    setIsCarouselVisible(true);
    setTimeout(() => {
      carouselRef.current?.snapToItem(index);
    }, 100);
    setSelectedMarker(coordinate);
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        provider={"google"}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: 49.2820,
          longitude: -123.1171,
          latitudeDelta: 0.0003,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude:  49.27699862052147,
            longitude: -123.11528432004984,
          }}
          onPress={() => Alert.alert("Home", "My location")}
          pinColor={"#90EE90"}
        >
          <Image style={styles.myLocationIcon} source={require('../assets/icons/mylocation.png')}/>
        </Marker>
        {renderEventMarkers()}
        <Heatmap
          points={heatMap}
          radius={150}
          opacity={0.7}
        />
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
  myLocationIcon: {
    width: 30,
    height: 30,
  },
});

export default MapScreen;
