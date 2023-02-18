import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import BookMarked from '../components/BookMarked'

const EventCard = (props: {
  eventTime: string
  eventName: string
  eventlocation: string
  eventParticipantsQty: string
}) => {
  return (
    <View>
      {/* EventImage <Image source={require('@expo/snack-static/react-native-logo.png')} /> */}
      <View>
        <Text>{props.eventTime}</Text>
        <Text>{props.eventName}</Text>
        {/* Icon <Image source={require('@expo/snack-static/react-native-logo.png')} /> */}
        <Text>{props.eventlocation}</Text>
        <Text>{props.eventParticipantsQty}</Text>
      </View>
      <BookMarked clicked={true} />
    </View>
  )
}

//Style
const styles = StyleSheet.create({})

export default EventCard
