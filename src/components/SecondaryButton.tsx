import { Pressable, Text, GestureResponderEvent, StyleSheet } from 'react-native';

import { colors } from '../styles/colors'
import { fontWeightSubtitle2, fontSize, fontFamily } from '../styles/fonts'

const SecondaryButton = (props: {
  onPress: (event: GestureResponderEvent) => void
  label: string
  isDark?: boolean
}) => {
  return (
    <Pressable onPress={props.onPress} style={props.isDark ? styles.button : styles.buttonLight}>
      <Text style={props.isDark ? styles.text : styles.textLight}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#90EE90',
    borderRadius: 22,
    borderWidth: 2,
    height: 42,
    width: 330,
  },
  buttonLight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.secondaryGreenLight,
    borderRadius: 22,
    borderWidth: 2,
    height: 42,
    width: 330,
  },
  text: {
    color: '#90EE90',
    fontWeight: fontWeightSubtitle2,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body
  },
  textLight: {
    color: colors.secondaryGreenLight,
    fontWeight: fontWeightSubtitle2,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body
  }
});

export default SecondaryButton;
