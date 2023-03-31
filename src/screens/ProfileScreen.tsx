import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { MainStackNavigationProps } from "../types/navigationTypes";
import { signOut } from "../auth/user";
import IconText from "../components/IconText";
import LinkButton from "../components/LinkButton";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightBody, fontWeightSubtitle, fontWeightSubtitle2 } from "../styles/fonts";

const ProfileScreen = ({ navigation, }: MainStackNavigationProps<'ProfileScreen'>) => {
  const onEditPress = () => {
    Alert.alert('edit clicked');
  };

  const onArrow = () => {
    Alert.alert('icon clicked');
  };

  const onPastEvent = () => {
    navigation.navigate('PastEventScreen');
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
        <View style={styles.item}>
          <IconText
            icon={require('../assets/icons/profileIcons/setting.png')}
            text={'Application Settings'}
            style={styles.iconText} />
            <Pressable onPress={onArrow}>
              <Image source={require('../assets/icons/downIcon.png')}/>
            </Pressable>
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
      <Pressable onPress={signOut}>
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
  logout: {
    color: colors.neutral.surfaceWhite,
    fontFamily: fontFamily.body,
    fontWeight: fontWeightBody,
    fontSize: fontSize.body,
    marginTop: 70,
  },
});

export default ProfileScreen;
