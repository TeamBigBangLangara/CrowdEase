import React, { useEffect } from 'react';
import { StyleSheet, Pressable, Text, View,Image, ImageBackground } from 'react-native';
import { AuthStackNavigationProps } from '../types/navigationTypes';
import PrimaryButton from '../components/PrimaryButton';
import { fontFamily, fontSize, } from "../styles/fonts";
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';

const SplashScreen = ({ navigation, }: AuthStackNavigationProps<'SplashScreen'>) => {

  const backgroundUri = require('../assets/images/splashScreenBackground.png');
  const logoUri = require('../assets/crowdeaseLogo/crowdease.png');
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.containerTop}>
      <ImageBackground source={backgroundUri} resizeMode="cover" style={styles.image}>
      <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(255,255,255,0.1)']} 
      style={styles.linearGradient}  />
        <View style={styles.container}>        
          <View style={styles.brandingView}>
            <Image source={logoUri} style={styles.logo} />
            <LinearTextGradient
              locations={[0, 1]}
              colors={["#B687FF","#68B5DE"]}
              start={{ x: 0, y: 0, }}
              end={{ x: 1, y: 0, }}
              >
              <Text  style={styles.heading}>
                Crowd Ease
              </Text>
            </LinearTextGradient>
          </View>
          <PrimaryButton 
          onPress={() => navigation.navigate('SignUpScreen')}
          label = {"Sign Up"}
          />
          <Pressable onPress={() => navigation.navigate('LoginScreen')}>
            <Text  style={styles.text}>I already have an account</Text>
          </Pressable>        
        </View>
        
    </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
    margin: 20,
    textAlign: 'center',
  },
  heading: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.appName,
    fontWeight: "700",
    color: '#E6E1E5',
    margin: 20,
    textAlign: 'center',    
  },
  logo:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 74,
  },
  brandingView:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerTop:{
    flex:1,
  },
});

export default SplashScreen;
