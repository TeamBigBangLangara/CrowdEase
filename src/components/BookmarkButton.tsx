import { addBookmark, removeBookmark } from '../api/bigBangAPI/bookmark';
import React from 'react';
import { useState } from "react";
import { Alert, Image, Pressable } from 'react-native';
import { useMutation } from 'react-query';

const BookmarkButton = (props: {eventId?:string, userID?:string}) => {

  const saveBookmark = useMutation(["bookmark"], () => addBookmark({
    "user_id": props.userID,
    "event_id": props.eventId,
}), {
    onSuccess: (data) => {
      console.log('Success :added');
      setBookmarkID(data);
    },
    onError: () => {
        console.log("Something went wrong, please try again.");
    },
});

const deleteBookmark = useMutation(["bookmark"], () => removeBookmark(bookmarkID
), {
  onSuccess: (data) => {
    console.log("Deleted ID "+bookmarkID);
    console.log('Success: removed');
    setBookmarkID('');
  },
  onError: () => {
      console.log("Something went wrong, please try again.");
  },
});


const onBookmarkPress = async() => {
  if(!bookmarkIsAdded)
  {
  try {
  const saveBookmarkData : any = await saveBookmark.mutate();
  setBookmarkIsAdded(!bookmarkIsAdded);
  }
  catch(error){
    Alert.alert('Unable to save data' +error);
  }
}
  else{
    try{
      await deleteBookmark.mutate();
      setBookmarkIsAdded(!bookmarkIsAdded);
    }
    catch(error){
      Alert.alert('Unable to save data' +error);
    }
  }
};


const [bookmarkIsAdded, setBookmarkIsAdded] = useState(false);
const [bookmarkID, setBookmarkID] = useState('');

  return (
    <Pressable onPress={
      //props.onBookmarkPress
      onBookmarkPress
      }> 
      {
        bookmarkIsAdded ? ( <Image source={require('../assets/icons/bookmarkSaved.png')} />) : ( <Image source={require('../assets/icons/bookmark.png')} />)
      }
      {/* <Image source={require('../assets/bookmark.png')} /> */}
    </Pressable>
  );
};

export default BookmarkButton;
