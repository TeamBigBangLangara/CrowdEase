import { Pressable, Text, GestureResponderEvent, StyleSheet } from 'react-native';

const SecondaryButton = (props: {
  onClick: (event: GestureResponderEvent) => void
  label: string
}) => {
  return (
    <Pressable onPress={props.onClick} style={styles.button}>
      <Text style={styles.text}>{props.label}</Text>
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
    width: 330,
    height: 42,
    // backgroundColor: 'black'
  },
  text: {
    color: '#90EE90',
    fontSize: 14,
  },
});

export default SecondaryButton;
