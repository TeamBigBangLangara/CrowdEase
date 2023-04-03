import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ImageBackground, Image, TouchableHighlight } from 'react-native';

import { isEmailValid } from '../utils/email';
import { onGoogleButtonPress } from '../auth/googleSignIn';
import { signIn } from '../auth/user';
import { AuthStackNavigationProps } from '../types/navigationTypes';
import PrimaryButton from '../components/PrimaryButton';

const LoginScreen = ({ navigation, }: AuthStackNavigationProps<'LoginScreen'>) => {
  const [email, setEmail] = useState('business@gmail.com');
  const [password, setPassword] = useState('test123');

  const onLoginPress = () => {
    if (loginValidation()) {
      signIn(email, password);
    }
  };

  const onAppleLoginPress = () => {
    // navigation.navigate('Home')
  };

  const onGoogleLoginPress = () => {
    onGoogleButtonPress().then(() => {
    });
  };

  const loginValidation = (): boolean => {
    if (isEmailValid(email)) {
      return true;
    } else {
      Alert.alert('Error', 'Invalid Email');
      return false;
    }
  };

  const uri = require('../assets/images/backgroundOfLoginScreen.jpg');


  return (
    <ImageBackground source={uri} resizeMode="cover" style={styles.image}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Login with Email</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={setEmail}
          value={email}
          placeholder={'Email'}
          placeholderTextColor= {'#938F99'}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder={'Password'}
          placeholderTextColor= {'#938F99'}
        />
        <Image source={require('../assets/icons/show.png')} style={styles.passwordIcon}/>
        {/* <Image source={require('../assets/icons/hidden.png')} style={styles.passwordIcon} /> */}
        <Pressable style={styles.textWrapper}>
          <Text style={styles.link}>Forgot Password</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <PrimaryButton label="Login" onPress={onLoginPress} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.text}>or login using</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableHighlight onPress={onAppleLoginPress}>
            <Image source={require('../assets/icons/loginIcons/apple.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={onGoogleLoginPress}>
            <Image source={require('../assets/icons/loginIcons/google.png')} />
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    margin: 20,
    padding: 16,
    backgroundColor: 'rgba(33, 33, 33, 0.9)',
    height: '100%',
    width: '100%',
  },
  header:{
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
    color: '#E6E1E5',
    margin: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 30,
    paddingBottom: 20,
  },
  buttonStyle: {
    width: 330,
    height: 42,
    backgroundColor: '#B687F4',
    shadowColor: '#6D5192',
    shadowOffset: { width: 1, height: 1, },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 22,
  },
  passwordIcon: {
    position: 'absolute',
    top: 205,
    right: 45,
  },
  iconContainer: {
    gap: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textInputStyle: {
    width: 330,
    height: 42,
    borderWidth: 2,
    borderColor: '#938F99',
    borderRadius: 100,
    color: '#938F99',
    placeholderTextColor: '#938F99',
    paddingLeft: 20,
    margin: 20,
  },
  textWrapper: {
    width: 330,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  link: {
    fontWeight: '400',
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#90EE90',
  },
  textContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
    margin: 20,
  },
  line:{
    backgroundColor: '#E6E1E5',
    height: 2,
    width: 90,
  },
});

export default LoginScreen;
