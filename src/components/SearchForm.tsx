import React, { useState } from 'react'
import { TextInput, StyleSheet, Image, View } from 'react-native'

import IconButton from './IconButton'

const SearchForm = (props: { searchEvent: () => {}; placeHolder: string }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <View style={styles.componentWrapper}>
      <View style={styles.searchWrapper}>
        <Image source={require('../assets/search.png')} />
        <TextInput
          onChangeText={setSearchValue}
          value={searchValue}
          onSubmitEditing={props.searchEvent}
          placeholder={props.placeHolder}
          style={styles.input}
          placeholderTextColor="#FFFFFF"
        />
        <Image source={require('../assets/mic.png')} />
      </View>
      <IconButton iconPath={require('../assets/categories_icon.png')} style={styles.iconButton} />
    </View>
  )
}

//Style
const styles = StyleSheet.create({
  componentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 22,
    gap: 20
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#938F99',
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 20
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    borderColor: '#938F99',
    color: '#FFFFFF'
  },
  iconButton: {}
})

export default SearchForm
