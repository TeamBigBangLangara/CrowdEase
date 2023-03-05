import React from 'react';
import { Pressable, Text, View } from 'react-native';
import SearchForm from '../components/SearchForm';

import EventCard from '../components/EventCard';
import IconButton from '../components/IconButton';
import RateCard from '../components/RateCard';

const SplashScreen = ({ navigation, }: { navigation: any }) => {
  const test = () => {
    console.log(test);
  };

  return (
    <View style={{ flex: 1, }}>
      <Text>Splash Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Sign Up')}>
        <Text>Sign up</Text>
      </Pressable>
      <Text>PAST EVENT</Text>
      <EventCard
        eventType={'past'}
        eventTime={'11am'}
        eventDate={'11 march'}
        eventName={'test'}
        eventLocation={'tjfgsg'}
        eventParticipantsQty={8555}
        onBookmarkPress={test}
      />
      <View style={{ marginBottom: 10, }}></View>
      <EventCard
        eventType={'NowEvent'}
        eventTime={'11am'}
        eventName={'test'}
        eventLocation={'tjfgsg'}
        eventParticipantsQty={8555}
        onBookmarkPress={test}
      />

      <RateCard onSubmitPress={test} />
    </View>
  );
};

export default SplashScreen;
