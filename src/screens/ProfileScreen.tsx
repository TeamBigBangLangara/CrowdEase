import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View, useColorScheme, Switch } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { MainStackNavigationProps } from "../types/navigationTypes";
import { signOut } from "../auth/user";
import IconText from "../components/IconText";
import LinkButton from "../components/LinkButton";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";
import { storage } from "../store/mmkv";

type ProfileScreenProps = MainStackNavigationProps<'ProfileScreen'>

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const [isDark, setIsDark] = useState(storage.getBoolean("isDark") || false);
  const { isDarkMode, toggleDarkMode } = route.params
  const [showSetting, setShowSetting] = useState(false)



  const onEditPress = () => {
    Alert.alert('edit clicked');
  };

  const onArrow = () => {
    Alert.alert('icon clicked');
  };

  const onPastEvent = () => {
    navigation.navigate('PastEventScreen');
  };

  const onShowSetting = () => {
    setShowSetting(!showSetting)
  };

    const changeDarkMode = () => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      toggleDarkMode(newIsDark);
      storage.set("isDark", newIsDark);
    };

  const goBack = () => {
    navigation.navigate('HomeScreen', {
      isDarkMode: isDark,
    });
  }

  const renderSetting = () => {
    return (
      <View style={isDark ? styles.showSetting : lightModeStyles.showSetting}>
        <Text style={isDark? styles.textSetting : lightModeStyles.textSetting}>{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
        <Switch
          value={isDark}
          onValueChange={changeDarkMode}
          thumbTintColor={isDark ? colors.primary.primaryPurpleDark : colors.neutral.grey}
          trackColor={{
            false: colors.neutral.surfaceWhite,
            true: colors.primary.primaryPurpleDark
          }}
        />
      </View>
    );
  };

  return (
    <View style={isDark ? styles.container : lightModeStyles.container}>
      <View style={isDark ? styles.header : lightModeStyles.header}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={goBack}>
            <Image source={isDark ? require('../assets/icons/backButton.png') : require('../assets/icons/lightMode/backButton.png')} />
          </Pressable>
          <Text style={isDark ? styles.headerTitle : lightModeStyles.headerTitle}>Profile</Text>
        </View>
        <Image source={isDark ? require('../assets/icons/profile.png') : require('../assets/icons/lightMode/profile.png')} />
      </View>
      <LinearGradient
        colors={isDark ? colors.primary.gradientDark.colors : colors.primary.gradientLight.colors}
        start={isDark ? colors.primary.gradientDark.start : colors.primary.gradientLight.start}
        end={isDark ? colors.primary.gradientDark.end : colors.primary.gradientLight.end}
        style={styles.borderGradient}
      >
        <View style={isDark ? styles.imageContainer : lightModeStyles.imageContainer}>
          <Image style={styles.picture} source={require('../assets/images/profileImage.png')} />
          <View style={styles.nameContainer}>
            <Text style={isDark ? styles.profileName : lightModeStyles.profileName}>NOMAD RESTAURANT</Text>
            <View style={styles.editContainer}>
              <Image source={isDark ? require('../assets/icons/profileIcons/edit.png') : require('../assets/icons/lightMode/edit.png')} />
              <LinkButton label={'Edit Profile'} style={isDark ? styles.editProfile : lightModeStyles.editProfile} onPress={onEditPress}/>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.listContainer}>
        <View style={isDark ? styles.item : lightModeStyles.item}>
          <IconText
            icon={isDark ? require('../assets/icons/profileIcons/customization.png') :  require('../assets/icons/lightMode/customization.png')}
            text={'Event Customization'}
            style={styles.iconText}
            isDark={isDark} />
          <Pressable onPress={onArrow}>
            <Image source={isDark ? require('../assets/icons/downIcon.png') : require('../assets/icons/lightMode/downArrow.png')} />
          </Pressable>
        </View>
        <View style={isDark ? styles.item : lightModeStyles.item}>
          <IconText
            icon={isDark ? require('../assets/icons/profileIcons/notification.png') : require('../assets/icons/lightMode/notification.png')}
            text={'Manage Notifications'}
            style={isDark ? styles.iconText : lightModeStyles.iconText}
            isDark={isDark} />
          <Pressable onPress={onArrow}>
            <Image source={isDark ? require('../assets/icons/downIcon.png') : require('../assets/icons/lightMode/downArrow.png')} />
          </Pressable>
        </View>
        <View style={isDark ? styles.settingContainer : lightModeStyles.settingContainer}>
          <View style={isDark ? styles.itemSetting : lightModeStyles.itemSetting}>
            <IconText
              icon={showSetting ? require('../assets/icons/activeSetting.png') :
                isDark ? require('../assets/icons/profileIcons/setting.png') : require('../assets/icons/lightMode/setting.png')}
              text={'Application Settings'}
              style={isDark ? styles.iconText : lightModeStyles.iconText}
              isDark={isDark} />
            <Pressable onPress={onShowSetting}>
              <Image source={!showSetting ?
                 isDark ? require('../assets/icons/downIcon.png') : require('../assets/icons/lightMode/downArrow.png') :
                 isDark ? require('../assets/icons/upIcon.png') : require('../assets/icons/lightMode/upArrow.png')} />
            </Pressable>
          </View>
          {showSetting ? renderSetting() : ""}
        </View>
        <View style={isDark ? styles.item : lightModeStyles.item}>
          <IconText
            icon={isDark ? require('../assets/icons/bookmark.png') : require('../assets/icons/lightMode/bookmark.png')}
            text={'Manage Bookmarks'}
            style={isDark ? styles.iconText : lightModeStyles.iconText}
            isDark={isDark} />
          <Pressable onPress={onArrow}>
            <Image source={isDark ? require('../assets/icons/rightIcon.png') : require('../assets/icons/lightMode/rightArrow.png')} />
          </Pressable>
        </View>
          <Pressable onPress={onPastEvent}>
        <View style={isDark ? styles.item : lightModeStyles.item}>
          <IconText
            icon={isDark ? require('../assets/icons/star.png') : require('../assets/icons/lightMode/star.png')}
            text={'Rate Past Events'}
            style={isDark ? styles.iconText : lightModeStyles.iconText}
            isDark={isDark} />
            <Image source={isDark ? require('../assets/icons/rightIcon.png') : require('../assets/icons/lightMode/rightArrow.png')} />
        </View>
          </Pressable>
      </View>
      <Pressable onPress={signOut} style={styles.logoutContainer}>
        <IconText
          icon={isDark ? require('../assets/icons/profileIcons/logout.png') : require('../assets/icons/lightMode/logout.png')}
          text={'Log Out'}
          style={isDark ? styles.logout : lightModeStyles.logout}
          isDark={isDark} />
      </Pressable>
    </View>
  );

};


const styles = StyleSheet.create({
  containerLight: {
    backgroundColor: colors.neutral.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  container: {
    backgroundColor: colors.neutral.backgroundBlack,
    paddingHorizontal: 20,
    paddingVertical: 24,
    flex: 1,
  },
  header: {
    height: 40,
    backgroundColor: colors.neutral.backgroundBlack,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceWhite,
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  imageContainer: {
    height: 80,
    backgroundColor: colors.neutral.surfaceBlack,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 400,
  },
  picture: {
    height: 100,
    width: 100,
    marginLeft: 15,
  },
  editProfile: {
    color: colors.neutral.surfaceWhite,
    borderBottomColor: colors.neutral.surfaceWhite,
  },
  profileName: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeightSubtitle,
  },
  editContainer: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  borderGradient: {
    height: 82,
    marginVertical: 40,
    marginHorizontal: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginRight: 20,
  },
  listContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    backgroundColor: colors.neutral.surfaceBlack,
    width: 358,
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    borderRadius: 22,
  },
  iconText: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    fontSize: fontSize.subtitle2,
  },
  logoutContainer: {
    marginTop: 80,
  },
  logout: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    fontSize: fontSize.body,
  },
  showSetting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.neutral.surfaceBlack,
    borderRadius: 22,
    marginBottom: 30,
    marginTop: 20,
  },
  settingContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.neutral.surfaceBlack,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    borderRadius: 22,
  },
  textSetting: {
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.neutral.surfaceWhite,
  },
  itemSetting: {
    backgroundColor: colors.neutral.surfaceBlack,
    width: 358,
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
  },
});

const lightModeStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    height: 40,
    backgroundColor: colors.neutral.backgroundWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightSubtitle2,
    color: colors.neutral.surfaceBlack,
  },
  imageContainer: {
    height: 80,
    backgroundColor: colors.neutral.backgroundWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 400,
  },
  editProfile: {
    color: colors.neutral.surfaceBlack,
    borderBottomColor: colors.neutral.surfaceBlack,
  },
  profileName: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle1,
    fontWeight: fontWeightSubtitle,
  },
  item: {
    backgroundColor: colors.neutral.backgroundWhite,
    width: 358,
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    borderRadius: 22,
  },
  iconText: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    fontSize: fontSize.subtitle2,
  },
  logout: {
    color: colors.neutral.surfaceBlack,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    fontSize: fontSize.body,
    marginTop: 70,
  },
  showSetting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.neutral.backgroundWhite,
    borderRadius: 22,
    marginBottom: 30,
    marginTop: 20,
  },
  settingContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.neutral.backgroundWhite,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //add an inset shadow using negative elevation
    insetShadow: {
      elevation: -4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4, },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    borderRadius: 22,
  },
  textSetting: {
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.neutral.surfaceBlack,
  },
  itemSetting: {
    backgroundColor: colors.neutral.backgroundWhite,
    width: 358,
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
  },
});

export default ProfileScreen;
