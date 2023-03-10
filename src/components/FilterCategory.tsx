import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";
import SecondaryButton from "./SecondaryButton";
import LinkButton from "./LinkButton";

const FilterCategory = (props: {visible: boolean, onRequestClose?: () => void, onTouchStart?: () => void, onClosePress: () => void} ) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        //onRequestClose={props.onRequestClose}
        style={styles.modalContainer}
      >
        <View onTouchStart={props.onTouchStart} style={styles.centeredView}>
          <View style={styles.modalView}>
              <LinkButton onPress={props.onClosePress} label={"Close"} style={styles.linkButton}/>
              <Text style={styles.title}>Event Category</Text>
              <View style={styles.buttonContainer}>
              <SecondaryButton onPress={() => console.log('apply filter sports')} label={"Sports"} />
              <SecondaryButton onPress={() => console.log('apply filter shows')} label={"Shows"} />
              <SecondaryButton onPress={() => console.log('apply filter music')} label={"Music"} />
              </View>
              <View style={styles.buttonContainer}>
              <SecondaryButton onPress={() => console.log('apply filter press')} label={"Festivals"} />
              <SecondaryButton onPress={() => console.log('apply filter press')} label={"Business"} />
              <SecondaryButton onPress={() => console.log('apply filter press')} label={"Others"} />
              </View>
              <PrimaryButton onPress={() => console.log('apply filter press')} label={"Apply Filter"}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(33,33,33,0.5)',
  },
  modalContainer: {
    //flex: 1,
  },
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.subtitle1,
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    color: colors.netural.surfaceWhite,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  linkButton: {
    color: colors.netural.surfaceWhite,
    borderBottomColor: 'rgba(12,25,88,0)',
  },
});

export default FilterCategory;
