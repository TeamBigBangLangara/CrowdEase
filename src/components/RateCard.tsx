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
import CustomAlert from "./CustomAlert";

const RateCard = (props: {
  onSkipPress: () => void;
  event: Event
  userId: string
  setModalShow: (show: boolean) => void
}) => {
  const [rate, setRate] = useState(props.event.rate);
  const [modalShow, setModalShow] = useState(false);

  const saveRating = useMutation('rating', () => addRating({
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
    setModalShow(true)
  };

  const onOKPress = () => {
    props.setModalShow(false);
    props.onSkipPress();
  }

  const renderStars = () => {
    const starIds = [1, 2, 3, 4, 5];
    return (
      <View style={styles.starContainer}>
        {starIds.map(id => (
          <Pressable key={id} onPress={() => { setRate(id) }}>
            {
              id <= rate ?
                <Image source={require("../assets/icons/StarActive.png")} />
                :
                <Image source={require("../assets/icons/star.png")} />
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
      <SecondaryButton onPress={onSubmitPress} label={'Submit'} isDark={true} />
      <View style={styles.skipLabel}>
        <LinkButton onPress={props.onSkipPress} label={'Skip'} style={styles.linkButton} />
      </View>
      {modalShow ? <CustomAlert onOkPress={onOKPress} /> : ''}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderTopColor: colors.neutral.surfaceWhite,
    alignItems: 'center',
    marginTop: margin.secondary,
    backgroundColor: colors.neutral.surfaceBlack,
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
    color: colors.neutral.backgroundWhite,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
  },
  linkButton: {
    color: colors.neutral.surfaceWhite,
    borderBottomColor: 'rgba(12,25,88,0)',
  },
});

export default RateCard;
