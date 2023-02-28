import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import BookMarked from '../components/BookMarked'
import IconText from './IconText'

const PassedEventCard = (props: {
  eventDate: string
  eventName: string
  eventLocation: string
  eventParticipantsQty: string
}) => {
  return (
    <View style={styles.generalWrapper}>
      <Text style={styles.text}>{props.eventDate}</Text>
      <Text style={styles.text}>{props.eventName}</Text>
      <View style={styles.locationParticipantsWrapper}>
        <IconText icon={require('../assets/Pin.png')} text={`${props.eventLocation}`} />
        <IconText
          icon={require('../assets/Participants.png')}
          text={`${props.eventParticipantsQty} participants`}
        />
      </View>
    </View>
  )
}

//Style
const styles = StyleSheet.create({
  generalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: 'rgba(12, 12, 14, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  text: {
    color: '#FAFBFC',
    fontSize: 14,
    lineHeight: 18
  },
  locationParticipantsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default PassedEventCard
