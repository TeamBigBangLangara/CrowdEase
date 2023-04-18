import { Text, Pressable, GestureResponderEvent, StyleSheet } from 'react-native';
import { fontFamily, fontSize, fontWeightBody} from "../styles/fonts";

const LinkButton = (props: {
  onPress: (event: GestureResponderEvent) => void
  label: string
  style: {
    color: string,
    borderBottomColor?: string
  } }) => {
  return (
    <Pressable onPress={props.onPress} style={[styles.textContainer, props.style]}>
      <Text style={[styles.text, props.style]}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'flex-end',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
  },
});

export default LinkButton;
