import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SecondaryButton from "./SecondaryButton";
import LinkButton from "./LinkButton";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { margin } from "../styles/basic";
import { useState } from "react";
import { useMutation } from "react-query";
import { addRating } from "../api/bigBangAPI/rating";
import { Event } from "../types/types";

const RateCard = (props: {
  onSkipPress: () => void;
  event: Event
  userId: string,
}) => {
  const [rate, setRate] = useState(props.event.rate);

  const saveRating = useMutation('rating',  () => addRating({
    user_id: props.userId,
    category: props.event.category.name,
    rate: rate,
    event_id: props.event.id,
  }), {
    onSuccess: () => {
    },
    onError: (error) => {
      console.log(error);
  },

  });

  const onSubmitPress = () => {
    saveRating.mutate();
  };

  const renderStars = () => {
    const starIds = [1, 2, 3, 4, 5];
    return (
      <View style={styles.starContainer}>
        {starIds.map(id => (
          <Pressable key={id} onPress={() => {setRate(id);
          }}>
            {
              id <= rate ?
                <Image source={require("../assets/icons/StarActive.png")}/>
                :
                <Image source={require("../assets/icons/star.png")}/>
            }
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Please tell how much this event affected your business?
      </Text>
      {renderStars()}
      <SecondaryButton onPress={onSubmitPress} label={'Submit'} />
      <View style={styles.skipLabel}>
        <LinkButton onPress={props.onSkipPress} label={'Skip'} style={styles.linkBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: colors.netural.surfaceWhite,
    alignItems: 'center',
    marginTop: margin.secondary,
    backgroundColor: colors.netural.surfaceBlack,
  },
  starContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 24,
    marginTop: margin.tertiary,
  },
  skipLabel: {
    marginTop: margin.secondary,
    alignItems: "center",
  },
  header: {
    marginTop: margin.secondary,
    marginBottom: margin.tertiary,
    color: colors.netural.backgroundWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
  },
  linkBtn: {
    color: '#ffff',
  },
});

export default RateCard;
