import { Text, Pressable, GestureResponderEvent, StyleSheet } from 'react-native';

const LinkButton = (props: { onClick: (event: GestureResponderEvent) => void; label: string }) => {
  return (
    <Pressable onPress={props.onClick}>
      <Text style={styles.text}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#90EE90',
    fontSize: 14,
    borderBottomColor: '#90EE90',
    borderBottomWidth: 1,
  },
});

export default LinkButton;
