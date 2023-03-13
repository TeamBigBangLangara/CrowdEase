import React, {useState, useRef} from 'react';
import { TextInput, StyleSheet, Image, View, Pressable, Text } from 'react-native';

import IconButton from './IconButton';

import { colors } from "../styles/colors";
import { fontSize, fontFamily } from "../styles/fonts";

const SearchForm = (props: {
  onChangeText: () => void

}) => {
  const textInputRef = useRef(null);
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  
  const cancelButtonHandling = () => {
    textInputRef.current.clear();  
    textInputRef.current.blur();    
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, searchOnFocus?styles.searchContainerFocus: styles.searchContainerNoFocus]}>
        <Image source={require('../assets/icons/search.png')} />
        <TextInput
          ref={textInputRef}
          onChangeText={props.onChangeText}
          onFocus={() => setSearchOnFocus(true)}
          onBlur={() => setSearchOnFocus(false)}
          placeholder="Search for ..."
          style={styles.input}
          placeholderTextColor={styles.input.color}
        />
        <Image source={require('../assets/icons/mic.png')} />
      </View>
      {searchOnFocus ? 
      <Pressable
        onPress={cancelButtonHandling}
        style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      :
      <IconButton iconPath={require('../assets/icons/filter.png')} onPress={()=>console.log()} />
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
  searchContainer: {
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
  },

  searchContainerNoFocus: {
    borderColor: colors.netural.surfaceWhite,
  },

  searchContainerFocus: {
    borderColor: colors.primaryPurpleLight,
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
