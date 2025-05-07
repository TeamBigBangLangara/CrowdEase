import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import IconButton from "./IconButton";

import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";

const SearchForm = (props: {
  onChangeText: (searchKeyword: string) => void
  onFilterPress: () => void
  onCancelPress: () => void
  textInputRef: any
}) => {
  const [searchOnFocus, setSearchOnFocus] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, searchOnFocus?styles.searchContainerFocus: styles.searchContainerNoFocus]}>
        <Image source={require('../assets/icons/search.png')} />
        <TextInput
          ref={props.textInputRef}
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
        onPress={props.onCancelPress}
        style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      :
        <IconButton iconPath={require('../assets/icons/filter.png')} onPress={props.onFilterPress} />
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
    borderColor: colors.neutral.surfaceWhite,
  },

  searchContainerFocus: {
    borderColor: '#B687FF',
  },

  input: {
    flex: 1,
    borderColor: colors.neutral.surfaceWhite,
    color: colors.neutral.surfaceWhite,
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
    color: colors.neutral.surfaceWhite,
  },
});

export default SearchForm;
