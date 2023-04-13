import React from "react";
import { Image, Pressable } from "react-native";

const BookmarkButton = (props: {
  eventId?: string, userID?: string,
  isBookmarkAdded: boolean,
  onBookmarkPress?: () => void,
  isDark?: boolean
}) => {

  return (
    <Pressable onPress={props.onBookmarkPress}>
      {
        props.isBookmarkAdded ? (
            <Image source={require("../assets/icons/bookmarkSaved.png")} />)
          : (<Image source={props.isDark ? require("../assets/icons/bookmark.png") : require("../assets/icons/lightMode/bookmark.png")} />)
      }
    </Pressable>
  );
};

export default BookmarkButton;
