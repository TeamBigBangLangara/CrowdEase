import { getEventById } from '../api/event';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { MainStackNavigationProps } from 'types/navigationTypes';


const EventDetailsScreen = ({route}: MainStackNavigationProps<'EventDetailsScreen'>) => {
  const {eventId} = route.params
  const requestEventById = useQuery('eventDetail', () => getEventById(eventId))

  return (
    <View>
      <Text>SingleEvent Screen</Text>
<Text>{JSON.stringify(requestEventById.data)}</Text>
    </View>
  );
};

export default EventDetailsScreen;
