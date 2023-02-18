import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const SearchForm = (props: { searchEvent: () => {}; placeHolder: string }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <TextInput
      onChangeText={setSearchValue}
      value={searchValue}
      onSubmitEditing={props.searchEvent}
      placeholder={props.placeHolder}
      style={styles.input}
    />
  )
}

//Style
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20
  }
})

export default SearchForm
