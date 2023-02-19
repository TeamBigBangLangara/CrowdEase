import { StyleSheet, TextInput } from 'react-native';

const InputText = (props: { onChange?: ((text: string) => void); placeHolder: string }) => {
return (
  <TextInput
  style={styles.input}
  onChangeText={props.onChange}
  placeholder={props.placeHolder}
  />
)
}

const styles = StyleSheet.create ({
  input: {
    width: 330,
    height: 42,
    backgroundColor: '#EEF5FC',
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    borderRadius: 100,
  }
})

export default InputText