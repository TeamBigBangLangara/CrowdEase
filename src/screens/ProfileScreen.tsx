import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View, useColorScheme, Switch } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { MainStackNavigationProps } from "../types/navigationTypes";
import { signOut } from "../auth/user";
import IconText from "../components/IconText";
import LinkButton from "../components/LinkButton";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";

const ProfileScreen = ({ navigation, }: MainStackNavigationProps<'ProfileScreen'>) => {

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

  const renderSetting = () => {
    return (
      <View style={styles.showSetting}>
        <Text style={styles.textSetting}>Light Mode</Text>
        <Switch
            value={toggleDarkMode}
            onValueChange={toggleDarkMode}
            thumbTintColor={colors.neutral.surfaceWhite}
            trackColor={{
              false: colors.neutral.surfaceWhite, 
              true: colors.primary.primaryPurpleDark
            }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/backButton.png')}/>
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <Image source={require('../assets/icons/profile.png')} />
        </View>
      <LinearGradient
        colors={colors.primary.gradientDark.colors}
        start={colors.primary.gradientDark.start}
        end={colors.primary.gradientDark.end}
        style={styles.borderGradient}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.picture} source={require('../assets/images/profileImage.png')} />
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>NOMAD RESTAURANT</Text>
            <View style={styles.editContainer}>
              <Image source={require('../assets/icons/profileIcons/edit.png')} />
              <LinkButton label={'Edit Profile'} style={styles.editProfile} onPress={onEditPress} />
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.listContainer}>
        <View style={styles.item}>
          <IconText
            icon={require('../assets/icons/profileIcons/customization.png')}
            text={'Event Customization'}
            style={styles.iconText} />
            <Pressable onPress={onArrow}>
              <Image source={require('../assets/icons/downIcon.png')}/>
            </Pressable>
        </View>
        <View style={styles.item}>
          <IconText
            icon={require('../assets/icons/profileIcons/notification.png')}
            text={'Manage Notifications'}
            style={styles.iconText} />
            <Pressable onPress={onArrow}>
              <Image source={require('../assets/icons/downIcon.png')}/>
            </Pressable>
        </View>
        <View style={styles.settingContainer}>
          <View style={styles.itemSetting}>
            <IconText
              icon={require('../assets/icons/profileIcons/setting.png')}
              text={'Application Settings'}
              style={styles.iconText} />
            <Pressable onPress={onShowSetting}>
              <Image source={showSetting ? require('../assets/icons/downIcon.png') : require('../assets/icons/rightIcon.png')} />
            </Pressable>
          </View>
          {showSetting ? renderSetting() : ""}
        </View>
        <View style={styles.item}>
          <IconText
            icon={require('../assets/icons/bookmark.png')}
            text={'Manage Bookmarks'}
            style={styles.iconText} />
            <Pressable onPress={onArrow}>
              <Image source={require('../assets/icons/rightIcon.png')}/>
            </Pressable>
        </View>
        <View style={styles.item}>
          <IconText
            icon={require('../assets/icons/star.png')}
            text={'Rate PastEvents'}
            style={styles.iconText} />
            <Pressable onPress={onPastEvent}>
              <Image source={require('../assets/icons/rightIcon.png')}/>
            </Pressable>
        </View>
      </View>
      <Pressable onPress={signOut} style={styles.logoutContainer}>
        <IconText
        icon={require('../assets/icons/profileIcons/logout.png')}
        text={'Log Out'}
        style={styles.logout} />
      </Pressable>
    </View>
  );

};


 const styles = StyleSheet.create({
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
    height: 60,
    width: 60,
    marginLeft: 30,
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
    shadowOffset: { width: -2, height: 6, },
    shadowColor: 'rgba(131, 53, 253, 1)',
    shadowOpacity: 0.9,
    shadowRadius: 3,
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
    shadowOffset: { width: -2, height: 6, },
    shadowColor: 'rgba(131, 53, 253, 1)',
    shadowOpacity: 0.9,
    shadowRadius: 3,
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

export default ProfileScreen;
