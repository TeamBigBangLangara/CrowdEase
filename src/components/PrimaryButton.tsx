import { Pressable, Text, GestureResponderEvent, StyleSheet, View } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';

import { colors } from '../styles/colors';
import { fontFamily } from '../styles/fonts';
import { fontSize } from '../styles/fonts';
import { fontWeightSubtitle2 } from '../styles/fonts';

const PrimaryButton = (props: { onPress: ((event: GestureResponderEvent) => void); label: string; isDark?: boolean }) => {

  return (
    <View style={[props.isDark ? styles.button : styles.buttonLight, styles.elevation]}>
      <Pressable
          onPress={props.onPress}
          style={({ pressed, }) => [
            pressed ? styles.pressedShadow : styles.shadowProp,
            props.isDark ? styles.button : styles.buttonLight
          ]}
        >
          <Text style={props.isDark ? styles.text : styles.textLight}>{props.label}</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.primaryPurpleDark,
    borderRadius: 22,
    width: 330,
    height: 42,
  },
  buttonLight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.primaryPurpleLight,
    borderRadius: 22,
    width: 330,
    height: 42,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
  },
  pressedShadow: {
    shadowColor: 'rgba(131, 53, 253, 0.9)',
    shadowOffset: {
      width: 12,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 13,
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 6,},
    shadowColor: 'rgba(131, 53, 253, 1)',
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  elevation: {
    shadowColor:  'rgba(131, 53, 253, .7)',
    elevation: 20,
  },
  text: {
    color: colors.neutral.surfaceBlack,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightSubtitle2,
  },
  textLight: {
    color: colors.neutral.backgroundWhite,
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightSubtitle2,
  },
  shadow: {
    borderRadius: 22,
  },
});

export default PrimaryButton;
