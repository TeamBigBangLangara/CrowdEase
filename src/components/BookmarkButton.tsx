import { addBookmark } from '../api/bigBangAPI/bookmark';
import React from 'react';
import { useState } from "react";
import { Image, Pressable } from 'react-native';
import { useMutation } from 'react-query';

const BookmarkButton = (props: {eventId?:string, 
  //onBookmarkPress?: () => void 
}) => {

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

const onBookmarkPress = async() => {
  if(!bookmarkIsAdded)
  {
  console.log('Bookmark Is Pressed!!');
  await saveBookmark.mutate();
  setBookmarkIsAdded(!bookmarkIsAdded);
  }
  else{
    setBookmarkIsAdded(!bookmarkIsAdded);
  }
};


const [bookmarkIsAdded, setBookmarkIsAdded] = useState(false);

  return (
    <Pressable onPress={
      //props.onBookmarkPress
      onBookmarkPress
      }> 
      {
        bookmarkIsAdded ? ( <Image source={require('../assets/bookmarkSaved.png')} />) : ( <Image source={require('../assets/bookmark.png')} />)
      }
      {/* <Image source={require('../assets/bookmark.png')} /> */}
    </Pressable>
  );
};

export default BookmarkButton;
