import React from "react";
import { Image, Pressable } from "react-native";

const BookmarkButton = (props: {
  eventId?: string, userID?: string,
  isBookmarkAdded: boolean,
  onBookmarkPress?: () => void
}) => {

  return (
    <Pressable onPress={props.onBookmarkPress}>
      {
        props.isBookmarkAdded ? (
            <Image source={require("../assets/icons/bookmarkSaved.png")} />)
          : (<Image source={require("../assets/icons/bookmark.png")} />)
      }
    </Pressable>
  );
};

export default BookmarkButton;
