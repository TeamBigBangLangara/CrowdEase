import { Text, Pressable, GestureResponderEvent, StyleSheet } from 'react-native';
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightSubtitle2} from "../styles/fonts";

const LinkButton = (props: { onPress: (event: GestureResponderEvent) => void; label: string }) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text style={styles.text}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.netural.surfaceWhite,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightSubtitle2,
  },
});

export default LinkButton;
