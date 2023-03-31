import React from 'react';
import MapView from "react-native-maps";
import { Text, View, StyleSheet, Image, Alert, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useMutation, useQuery } from 'react-query';


import { getEventById } from '../api/event';
import { colors } from '../styles/colors';
import { fontFamily } from '../styles/fonts';
import { fontSize } from '../styles/fonts';
import { fontWeightSubtitle, fontWeightBody, fontWeightSubtitle2 } from '../styles/fonts';
import { mapDarkStyle } from "../styles/maps";
import { MainStackNavigationProps } from '../types/navigationTypes';
import IconText from '../components/IconText';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


const EventDetailsScreen = ({ route }: MainStackNavigationProps<'EventDetailsScreen'>) => {
  const { eventId } = route.params
  const navigation = useNavigation()
  const requestEventById = useQuery('eventDetail', () => getEventById(eventId),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    })

  const mapRef = React.useRef<any>(null);

  const onBookMark = () => {
    Alert.alert('bookmark clicked')
  }

  const dateObj = new Date(requestEventById.data?.dates.date);
  dateObj.setDate(dateObj.getDate() + 1);
  const formattedDate = dateObj.toLocaleString('en-US', { month: 'long', day: 'numeric' });


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/icons/leftIcon.png')} />
          </Pressable>
          <Image source={{ uri: requestEventById.data?.image, }} style={styles.image} />
          <View style={styles.nameContainer}>
            <View style={styles.participantsContainer}>
              <Image source={require('../assets/icons/participants.png')} />
              <Text style={styles.number}>{requestEventById.data?.participants}</Text>
            </View>
            <Text style={styles.name}>{requestEventById.data?.name}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <IconText
              icon={require('../assets/icons/calendar.png')}
              text={formattedDate}
              style={styles.iconText} />
            <IconText
              icon={require('../assets/icons/pin.png')}
              text={requestEventById.data?.address}
              style={styles.iconText} />
            <IconText
              icon={require('../assets/icons/category.png')}
              text={requestEventById.data?.category.name}
              style={styles.iconText} />
          </View>
          <View>
            <Text style={styles.title}>About</Text>
            <Text style={styles.details}>Join us on {requestEventById.data?.dates.date} the category of this event is {requestEventById.data?.category.name} and it will conduct in {requestEventById.data?.venue.name}</Text>
          </View>
          <View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.address}>{requestEventById.data?.venue.name}</Text>
            <Text style={styles.details}>{requestEventById.data?.address}</Text>
          </View>
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
          </MapView>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={onBookMark}
              label={'Add to Bookmark'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 5,
    zIndex: 10,

  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomColor: colors.neutral.outlineGrey,
    borderBottomWidth: 2,
    maxWidth: 340
  },
  participantsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    marginHorizontal: -20
  },
  number: {
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite
  },
  name: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite
  },
  iconTextContainer: {
    marginTop: 32,
    marginBottom: 16
  },
  iconText: {
    fontFamily: fontFamily.subtitle,
    fontSize: 30,
    fontWeight: fontWeightSubtitle,
    color: colors.neutral.surfaceWhite,
    marginBottom: 16
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
    marginBottom: 8
  },
  address: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite
  },
  details: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightBody,
    color: colors.neutral.surfaceWhite,
    marginBottom: 32
  },
  map: {
    height: 220,
    width: 330,
    borderRadius: 22,
    marginTop: -26,
    marginBottom: 32
  },
  buttonContainer: {
    backgroundColor: colors.neutral.surfaceBlack,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginHorizontal: -18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 97
  }
})
export default EventDetailsScreen;
