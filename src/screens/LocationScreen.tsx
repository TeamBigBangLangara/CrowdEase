import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Switch, Platform, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { AuthStackNavigationProps } from '../types/types'

interface GeoPositionState {
  latitude: number | null
  longitude: number | null
  error: string | null
}

const LocationScreen = ({ navigation }: AuthStackNavigationProps<'LocationScreen'>) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [location, setLocation] = useState<GeoPositionState>({
    latitude: null,
    longitude: null,
    error: null
  })

  const getLocation = () => {
    if (signUpValidation()) {
      navigation.navigate('BottomTabs')
    }
  }

  const signUpValidation = (): boolean => {
    return true
  }

  const toggleSwitchPress = async () => {
    setIsEnabled(previousState => !previousState)
    console.log(isEnabled)
    await requestPermissions()
  }

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse')
      if (auth === 'granted') {
        console.log('IOS')
        await getGeolocationCoordinates()
      } else {
        console.log('Permission denied')
      }
    }

    if (Platform.OS === 'android') {
      if (await requestLocationPermissionAndroid()) {
        await getGeolocationCoordinates()
      } else {
        console.log('Permission denied')
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
          buttonPositive: 'OK'
        }
      )
      console.log('granted', granted)
      if (granted === 'granted') {
        console.log('You can use Geolocation')
        return true
      } else {
        console.log('You cannot use Geolocation')
        return false
      }
    } catch (err) {
      return false
    }
  }

  const getGeolocationCoordinates = async () => {
    return Geolocation.getCurrentPosition(
      position => {
        console.log(position)
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  return (
    <View style={styles.wrapper}>
      <Text>CrowdEase works best with location permission </Text>
      <View style={styles.container}>
        <Switch
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchPress}
          value={isEnabled}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button onPress={getLocation} title="Get Location" accessibilityLabel="Get Location" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    margin: 20
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    padding: 2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 4
  },
  iconStyle: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LocationScreen
