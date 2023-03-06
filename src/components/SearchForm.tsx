import React from 'react';
import { TextInput, StyleSheet, Image, View } from 'react-native';

import IconButton from './IconButton';

const SearchForm = (props: {
  placeHolder: string
  onChangeText: () => void
  searchText: string
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={require('../assets/search.png')} />
        <TextInput
          onChangeText={props.onChangeText}
          value={props.searchText}
          placeholder={props.placeHolder}
          style={styles.input}
          placeholderTextColor="#FFFFFF"
        />
        <Image source={require('../assets/mic.png')} />
      </View>
      <IconButton iconPath={require('../assets/filter.png')} style={styles.iconButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 22,
    gap: 20,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#938F99',
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    borderColor: '#938F99',
    color: '#FFFFFF',
  },
  iconButton: {},
});

export default SearchForm;
