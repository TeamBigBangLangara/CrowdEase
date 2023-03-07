import { Text, Pressable, GestureResponderEvent, StyleSheet } from 'react-native';
import { fontFamily, fontSize, fontWeightBody} from "../styles/fonts";

const LinkButton = (props: { 
  onPress: (event: GestureResponderEvent) => void 
  label: string 
  color: string }) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text style={[styles.text, {color: props.color, borderBottomColor: props.color}]}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    borderBottomWidth: 1,
  },
});

export default LinkButton;
