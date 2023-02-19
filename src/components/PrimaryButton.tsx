import { Pressable, Text, GestureResponderEvent, StyleSheet } from 'react-native';

const PrimaryButton = (props: { onClick: ((event: GestureResponderEvent) => void) ; label: string; }) => {
  return (
  <Pressable
  onPress={props.onClick}
  style={({ pressed }) => [        
    pressed ? styles.pressedShadow : styles.shadowProp,
    styles.button 
       ]}
    >
      <Text style= {styles.text}>{props.label}</Text>
</Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B687F4',
    borderRadius: 22,
    width: 330,
    height: 42
  },
  pressedShadow : {
    shadowColor: 'rgba(131, 53, 253, 0.9)',
    shadowOffset: {
      width: 12,
      height: 8},
    shadowOpacity: 1,
    shadowRadius: 13,
  }, 
  shadowProp: {
    shadowColor: 'rgba(131, 53, 253, 0.9)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 1,
    shadowRadius: 3,

  },
  text: {
    color: '#212121',
    fontSize: 14,
  }
})

export default PrimaryButton;