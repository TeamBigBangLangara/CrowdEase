import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Heatmap, Marker } from "react-native-maps";

import { markers } from '../model/mapData';
import { mapDarkStyle } from "../styles/maps";

const { width, height, } = Dimensions.get('window');
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
  const initialMapState = {
    markers,
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const [state, setState] = useState(initialMapState);
  const [activeCoordinate, setActiveCoordinate] = useState({});
  const [heatmapData, setHeatmapData] = useState([
    { latitude: 49.2803897, longitude: -123.1126552, },
    { latitude: 49.2797959, longitude: -123.0974419, },
    { latitude: 49.2756562, longitude: -123.1096782, },
    { latitude: 49.2838, longitude: -123.1193,}
    // more data points
  ]);

  const _map = React.useRef<any>(null);
  const _scrollView = React.useRef<any>(null);

  useEffect(() => {
    mapAnimation.addListener(({ value, }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate, } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
          setActiveCoordinate(coordinate);
        }
      }, 10);
      // clearTimeout(regionTimeout);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange: number[] = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return { scale, };
  });

  // const onMarkerPress = (mapEventData) => {
  //   const markerID = mapEventData._targetInst.return.key;

  //   let x = (markerID * CARD_WIDTH) + (markerID * 20);
  //   if (Platform.OS === 'ios') {
  //     x = x - SPACING_FOR_CARD_INSET;
  //   }

  //   _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  // }

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={"google"}
        customMapStyle={mapDarkStyle}
        style={styles.map}
        initialRegion={{
          latitude: 49.264131,
          longitude: -123.1569595,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1523,
        }}>

        {markers.map((marker, index) => {
          return (
            <Marker
              coordinate={marker.coordinate}
              pinColor={activeCoordinate !== marker.coordinate ? "purple" : "green"}
              key={Math.random()}></Marker>
          );
        })}
        {<Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324, }}
            title="Marker Title"
            description="Marker Description"
          /> }
        {<Heatmap points={heatmapData} radius={50}/> }
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH + 20}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            }
          ],
          { useNativeDriver: true, }
        )}>
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image source={marker.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.timing}
              </Text>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.location}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.participants}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    //shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
});

export default MapScreen;

