import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import BookmarkButton from './BookmarkButton'
import IconText from './IconText'

const EventCard = (props: {
  eventImage?: any
  eventTime: string
  eventName: string
  eventLocation: string
  eventParticipantsQty: number
  onBookmarkPress: () => void
}) => {
  return (
    <View style={styles.container}>
      <Image source={props.eventImage} style={styles.eventImage} />
      <View style={styles.eventContainer}>
        <Text style={styles.text}>{props.eventTime}</Text>
        <Text style={styles.text}>{props.eventName}</Text>
        <IconText icon={require('../assets/pin.png')} text={props.eventLocation} />
        <View style={styles.participantsContainer}>
          <IconText
            icon={require('../assets/participants.png')}
            text={`${props.eventParticipantsQty} participants`}
          />
          <BookmarkButton onBookmarkPress={props.onBookmarkPress} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  eventContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingHorizontal: 5
  },
  participantsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default EventCard
