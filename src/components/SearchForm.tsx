import React, {useState} from 'react';
import { TextInput, StyleSheet, Image, View, Pressable, Text } from 'react-native';

import IconButton from './IconButton';

import { colors } from "../styles/colors";
import { fontSize, fontFamily } from "../styles/fonts";

const SearchForm = (props: {
  placeHolder: string
  onChangeText: () => void

}) => {
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  


  return (
    <View style={styles.container}>
      <View style={searchOnFocus?styles.searchContainerFocus: styles.searchContainerNoFocus}>
        <Image source={require('../assets/search.png')} />
        <TextInput
          onChangeText={props.onChangeText}
          // onFocus={setSearchOnFocus(true)}
          placeholder={props.placeHolder}
          style={styles.input}
          placeholderTextColor={styles.input.color}
        />
        <Image source={require('../assets/mic.png')} />
      </View>
      {searchOnFocus ? 
      <Pressable
        onPress={()=> console.log("test")}
        style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      :
      <IconButton iconPath={require('../assets/filter.png')} onPress={()=>console.log()} />
    }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderRadius: 22,
    gap: 20,
  },
  searchContainerNoFocus: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 16,
    height: 42,
    borderRadius: 20,
    gap: 12,

    borderColor: colors.netural.surfaceWhite,
  },
  searchContainerFocus: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 16,
    height: 42,
    borderRadius: 20,
    gap: 12,

    borderColor: colors.primaryPurpleLight,
    shadowColor: 'rgba(255, 0, 50, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
  },
  input: {
    flex: 1,
    borderColor: colors.netural.surfaceWhite,
    color: colors.netural.surfaceWhite,
  },
  iconButton: {
    flex: 1,
  },
  cancelButton: {
    display: "flex",
    alignItems: 'center',
  },
  cancelText: {
    fontSize: fontSize.body,
    fontFamily: fontFamily.body,
    color: colors.netural.surfaceWhite,
  },
});

export default SearchForm;
