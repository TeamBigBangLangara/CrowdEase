import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Platform,
  PermissionsAndroid,
  Alert,
  TextInput
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getPostalCodeCoordinates } from '../api/postalCodeApi';
import { AuthStackNavigationProps } from '../types/navigationTypes';
import { isPostalCodeValid } from '../utils/postalCode';
import { onGoogleButtonPress } from '../auth/googleSignIn';
import { signUp, signIn, getUser } from '../auth/user';
import { Location } from 'types/types';
import { addUser } from '../api/bigBangAPI/users';
import PrimaryButton from '../components/PrimaryButton';

const LocationScreen = ({ route, navigation, }: AuthStackNavigationProps<'LocationScreen'>) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { emailParam, passwordParam, userName, } = route?.params;
  const [postalCode, setPostalCode] = useState('');
  const [location, setLocation] = useState<Location>({
    latitude: '',
    longitude: '',
  });

  const signInOnLocationFetch = async() => {
    if(emailParam != ''){
      await signUp(emailParam, passwordParam);
      const userinfo = await getUser();
      await addUser(emailParam, userinfo.uid, userName);
      await signIn(emailParam, passwordParam);
    }
    else{
      await onGoogleButtonPress().then(async () => {
        const userinfo = await getUser();
        await addUser(userinfo.email, userinfo.uid,userName);
      });
    }
  };

  const getLocation = async () => {
    if (signUpValidation()) {
      if (isEnabled) {
        await signInOnLocationFetch();
      } else if (isPostalCodeValid(postalCode)) {
        try {
          let results = await getPostalCodeCoordinates(postalCode);
          setLocation({
            latitude: results?.latt,
            longitude: results?.longt,
          });
        } catch (error) {
          Alert.alert('Error', `${error}`);
        }
        await signInOnLocationFetch();
      } else {
        Alert.alert('Error', 'Enter a valid Postal Code to proceed');
      }
    }
  };

  const signUpValidation = (): boolean => {
    return true;
  };

  const toggleSwitchPress = async () => {
    setIsEnabled(previousState => !previousState);
    await requestPermissions();
  };

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        await getGeolocationCoordinates();
      } else {
        Alert.alert(
          'Error',
          'Location permission Denied. Enter Location or provide permission in settings'
        );
      }
    }

    if (Platform.OS === 'android') {
      if (await requestLocationPermissionAndroid()) {
        await getGeolocationCoordinates();
      } else {
        Alert.alert(
          'Error',
          'Location permission Denied. Enter Location or provide permission in settings'
        );
      }
    }
  }

  const setPostalCodeText = (inputText: string) => {
    const filteredText = inputText.replace(/[\s-]+/g, '');
    setPostalCode(filteredText);
  };

  const requestLocationPermissionAndroid = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getGeolocationCoordinates = async () => {
    return Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: `${position.coords.latitude}`,
          longitude: `${position.coords.longitude}`,
        });
      },
      error => {
        Alert.alert('Error', `${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.outerTopContainer}>
        <View style={styles.headerTop}>
          <Text style={styles.header}>CrowdEase works the best with location permission </Text>
        </View>
        <View style={styles.innerTopContainer}>
          <Image style={styles.locationIcon} source={require('../assets/icons/locationIcon.png')} />
          <Text style={styles.text}>
            Location is used to improve your experience by detecting events and crowds around you.
          </Text>
        </View>
        <View style={styles.GPSContainer}>
          <Text style={styles.header}>Turn on GPS</Text>
          <View style={styles.switchContainer}>
            <Switch
              hitSlop={{ top: 20, left: 1, right: 1, bottom: 20, }}
              trackColor={{ false: '#767577', true: '#B687FF', }}
              thumbColor={isEnabled ? '#FFFFFF' : '#B687FF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchPress}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
      <View style={styles.outerBottomContainer}>
        <View style={styles.textContainer}>
          <View style={styles.line}></View>
          <View>
            <Text style={styles.text}>or</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.innerBottomContainer}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={setPostalCodeText}
            value={postalCode}
            placeholder="Enter Postal Code Manually"
            placeholderTextColor= {'#938F99'}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton label="Sign Up" onPress={getLocation} />
          </View>
        </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(33, 33, 33, 0.9)',
    height: '100%',
    width: '100%',
  },
  outerTopContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
  },
  headerTop:{ 
    paddingTop: 40,
  },
  header:{
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
    color: '#E6E1E5',
    margin: 10,
  },
  innerTopContainer:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationIcon: {
    width: 28,
    height: 28,
  },
  switchContainer: {
    flex:1,
    padding: 5,
    margin: 5,
  },
  GPSContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
    marginHorizontal: 5,
  },
  outerBottomContainer: {
    flex: 1,
    paddingtop: 2,
    width: '100%',
    margintop: 2,
  },
  innerBottomContainer:{
    margin: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  line:{
    backgroundColor: '#E6E1E5',
    height: 2,
    width: 120,
  },
  buttonContainer: {
    flex:1,
    paddingTop: 50,
    paddingBottom: 30,
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    padding: 2,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: '#E6E1E5',
    margin: 10,
  },
  textInputStyle: {
    width: 330,
    height: 42,
    borderWidth: 2,
    borderColor: '#938F99',
    borderRadius: 100,
    color: '#938F99',
    paddingLeft: 20,
    
  },
  
});

export default LocationScreen;
