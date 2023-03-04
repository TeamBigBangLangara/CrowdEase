import { Text, Pressable, GestureResponderEvent, StyleSheet, View } from 'react-native';

const LinkButton = (props: { onClick: ((event: GestureResponderEvent) => void); label: string }) => {
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
    marginHorizontal: 10,
    width: 60,
    borderBottomColor: '#90EE90',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
});

export default LinkButton;
