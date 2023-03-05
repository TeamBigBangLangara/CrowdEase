import React from 'react';
import { Image, Pressable } from 'react-native';

const BookmarkButton = (props: { onBookmarkPress?: () => void }) => {
  return (
    <Pressable onPress={props.onBookmarkPress}>
      <Image source={require('../assets/bookmark.png')} />
    </Pressable>
  );
};

export default BookmarkButton;
