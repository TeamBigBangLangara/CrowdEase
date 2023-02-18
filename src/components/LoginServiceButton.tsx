import React from 'react';
import {Pressable, Image, GestureResponderEvent, StyleSheet} from 'react-native';

const LoginServiceButton = (props: {
  onClick: (event: GestureResponderEvent) => void;
  label: string;
}) => {
  return (
    <Pressable
      onPress={props.onClick}>
        <Image 
          source={{uri:'../assets/apple.svg'}}
          style={{backgroundColor: 'green'}}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({

});

export default LoginServiceButton;
