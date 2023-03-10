import { addBookmark } from 'api/bigBangAPI/bookmark';
import React from 'react';
import { useState } from "react";
import { Image, Pressable } from 'react-native';
import { useMutation } from 'react-query';

const BookmarkButton = (props: {eventId?:string, onBookmarkPress?: () => void }) => {

  
  const saveBookmark = useMutation(["bookmark"], () => addBookmark({
    "user_id": ' ',
    "event_id": props.eventId,
}), {
    onSuccess: () => {
    },
    onError: () => {
        console.log("Something went wrong, please try again.");
    },
});

const [bookmarkIsAdded, setBookmarkIsAdded] = useState(false);

  return (
    <Pressable onPress={props.onBookmarkPress}>
      <Image source={require('../assets/bookmark.png')} />
    </Pressable>
  );
};

export default BookmarkButton;
