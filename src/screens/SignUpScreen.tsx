import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert, ImageBackground, Image, TouchableHighlight } from 'react-native';

import { isEmailValid } from '../utils/email';
import { isPasswordValid } from '../utils/password';
import { AuthStackNavigationProps } from '../types/navigationTypes';
import PrimaryButton from '../components/PrimaryButton';
import { isBusinessNameValid } from '../utils/businessNameValidor';

const SignUpScreen = ({ navigation, }: AuthStackNavigationProps<'SignUpScreen'>) => {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (signUpValidation()) {
      navigation.navigate('LocationScreen', {
        emailParam: email,
        passwordParam: password,
        userName: businessName ? businessName : ' ',//Passing single space for empty value to avoid type error for null value
      });
    }
  };

  const onAppleSignUpPress = () => {
    navigation.navigate('LocationScreen', {
      emailParam: '',
      passwordParam: '',
      userName: ' ', //Passing single space for empty value to avoid type error for null value
    });
  };

  const onGoogleSignUpPress = () => {
    navigation.navigate('LocationScreen', {
    emailParam: '',
    passwordParam: '',
    userName: ' ', //Passing single space for empty value to avoid type error for null value
    });
  };

  const signUpValidation = (): boolean => {
    if (isEmailValid(email) && isPasswordValid(password) && isBusinessNameValid(businessName)) {
      return true;
    } else {
      Alert.alert('Error', 'Invalid Email or Password');
      return false;
    }
  };

  const uri = require('../assets/images/backgroundOfLoginScreen.jpg');

  return (
    <ImageBackground source={uri} resizeMode="cover" style={styles.image}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Create an account</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.textInputStyle}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter Email"
          placeholderTextColor= {'#938F99'}
        />
        <TextInput
          style={styles.textInputStyle}
          autoCapitalize={"none"}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor= {'#938F99'}
        />
         <Image source={require('../assets/icons/show.png')} style={styles.passwordIcon}/>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={setBusinessName}
          autoCapitalize={"none"}
          value={businessName}
          placeholder="Enter Business Name"
          placeholderTextColor= {'#938F99'}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton label="Sign Up" onPress={onSignUpPress} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.text}>or Signup using</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableHighlight onPress={onAppleSignUpPress}>
            <Image source={require('../assets/icons/loginIcons/apple.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={onGoogleSignUpPress}>
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
  buttonContainer: {
    margin: 30,
    paddingBottom: 20,
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
  textContainer:{
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
  passwordIcon: {
    position: 'absolute',
    top: 205,
    right: 55,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    gap: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default SignUpScreen;
