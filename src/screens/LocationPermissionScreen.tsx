import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  //TextInput,
  Button,
  //Pressable,
  Switch,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationPermissionScreen = ({navigation}: {navigation: any}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  let location: any;
  const getLocation = () => {
    if (signUpValidation()) {
      navigation.navigate('Home');
    }
  };

  const signUpValidation = (): boolean => {
    return true;
  };

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    console.log(isEnabled);
    if (isEnabled) {
      await requestPermissions();
    }
  };

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        // do something if granted...
        console.log('IOS');
        getGeolocationCoordinates();
      } else {
        console.log('Permission denied');
      }
    }

    if (Platform.OS === 'android') {
      if (await requestLocationPermissionAndroid()) {
        getGeolocationCoordinates();
      } else {
        console.log('Permission denied');
      }
    }
  }

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
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getGeolocationCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    console.log('Here I am : ');
  };

  return (
    <View style={styles.wrapper}>
      <Text>CrowdEase works best with location permission </Text>
      <View style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          onPress={getLocation}
          title="Get Location"
          accessibilityLabel="Get Location"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    margin: 20,
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    padding: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 4,
  },
  iconStyle: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationPermissionScreen;
