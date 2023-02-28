import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import BookMarked from '../components/BookMarked'

const EventCard = (props: {
  eventImage: any
  eventTime: string
  eventName: string
  eventLocation: string
  eventParticipantsQty: string
}) => {
  return (
    <View style={styles.generalWrapper}>
      <Image source={props.eventImage} style={styles.eventImage} />
      <View style={styles.infoWrapper}>
        <Text style={styles.text}>{props.eventTime}</Text>
        <Text style={styles.text}>{props.eventName}</Text>
        <View style={styles.location}>
          <View style={styles.iconsWrapper}>
            <Image source={require('../assets/Pin.png')} />
          </View>
          <Text style={styles.text}>{props.eventLocation}</Text>
        </View>
        <View style={styles.participantsBookMarkWrapper}>
          <View style={styles.participants}>
            <View style={styles.iconsWrapper}>
              <Image source={require('../assets/Participants.png')} />
            </View>
            <Text style={styles.text}>{props.eventParticipantsQty} participants</Text>
          </View>
          <BookMarked clicked={true} />
        </View>
      </View>
    </View>
  )
}

//Style
const styles = StyleSheet.create({
  generalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderRadius: 22,
    backgroundColor: 'rgba(12, 12, 14, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  text: {
    color: '#FAFBFC',
    fontSize: 14,
    lineHeight: 18
  },
  eventImage: {
    width: 100,
    height: 100,
    display: 'flex',
    backgroundColor: 'red',
    borderRadius: 10
  },
  infoWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    marginRight: 5,
  },
  participantsBookMarkWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default EventCard
