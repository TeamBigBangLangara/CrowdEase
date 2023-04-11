import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";

import { fontFamily, fontSize, fontWeightSubtitle } from "../styles/fonts";
import { colors } from "../styles/colors";

import PrimaryButton from "./PrimaryButton";
import LinkButton from "./LinkButton";
import { TypeCategoryFilter } from "../screens/EventScreen";

//////////////////////// FILTER PRESSABLE COMPONENT ////////////////////////
const EventCategoryPressable = (props: {name: string, icon?: any, categoryFilterArray: TypeCategoryFilter[]}) => {
  //Get the corresponding object in the categoryFilterArray in order to check if the button is already check or not (boolean)
  const categoryFilterObject = props.categoryFilterArray.find(item => item.category === props.name);
  //Get if the corresponding object is active or not
  const [isSelected, setIsSelected] = useState(categoryFilterObject?.isActive);


  const selectionHandle = () => {

    //If is selected, deselect and viceversa
    if(!isSelected){
      //Update isActive status
      categoryFilterObject.isActive = true;
      setIsSelected(true);
    } else {
      //Update isActive status
      categoryFilterObject.isActive = false;
      setIsSelected(false);
    }

  };

  return (
    <Pressable onPress={selectionHandle} style={[styles.eventsFilterPressable, isSelected && styles.eventsFilterPressableActive]}>
      <Text style={[styles.eventsFilterPressableText, isSelected && styles.eventsFilterPressableActive]}>{props.name}</Text>
      {props.icon &&
      <Image source={props.icon}/>}
    </Pressable>
  );
};

//////////////////////// MAIN COMPONENT ////////////////////////

const FilterCategory = (props: {
  visible: boolean, 
  onRequestClose?: () => void, 
  onTouchStart?: () => void, 
  onClosePress: () => void,
  onApplyFilterPress: (newCategoryFilterArray: TypeCategoryFilter[]) => void, 
  categoryFilterArray: TypeCategoryFilter[], 
  }
  ) => {

  //Category Filter Array
  const updatedCategoryFilter = props.categoryFilterArray;

  /////========= Handlers
  //Handler when ApplyFilter Button is pressed
  const applyFilterHandler = () => {
    props.onApplyFilterPress(updatedCategoryFilter);
    props.onClosePress();
  };


  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        style={styles.container}
      >
        <View onTouchStart={props.onTouchStart} style={styles.centeredView}>

          <View style={styles.modalView}>
            <View style={styles.eventsFilterHeaderContainer}>
              <LinkButton onPress={props.onClosePress} label={"Close"} style={styles.eventsFilterHeaderContainerButtons}/>
              
              <View style={{flexDirection: 'row', columnGap: 5,}}>
                <Text style={styles.eventsFilterHeaderContainerTitle}>Filters</Text>
                <Image source={require('../assets/icons/filter.png')}/>
              </View>
              <LinkButton onPress={() => console.log("under development")} label={"Clear All"} style={styles.eventsFilterHeaderContainerButtons}/>
            </View>

            <View style={styles.eventsFilterContainer}>
              <Text style={styles.eventsFilterContainerTitle}>Event Category</Text>
              <View style={styles.eventsFilterPressableContainer}>
                <View style={styles.eventsFilterPressableContainerRow}>
                  <EventCategoryPressable name={"Sports"} icon={require('../assets/category/sport.png')} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={"Shows"} icon={require('../assets/category/show.png')} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={"Music"} icon={require('../assets/category/music.png')} categoryFilterArray={updatedCategoryFilter}/>
                </View>
                <View style={styles.eventsFilterPressableContainerRow}>
                  <EventCategoryPressable name={"Festivals"} icon={require('../assets/category/festival.png')} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={"Business"} icon={require('../assets/category/business.png')} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={"Other"} icon={require('../assets/category/other.png')} categoryFilterArray={updatedCategoryFilter}/>
                </View>
              </View>
            </View>

            <View style={styles.eventsFilterContainer}>
              <Text style={styles.eventsFilterContainerTitle}>Distance</Text>
              <View style={styles.eventsFilterPressableContainer}>
                <View style={styles.eventsFilterPressableContainerRow}>
                  <EventCategoryPressable name={'500m'} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={'1km'} categoryFilterArray={updatedCategoryFilter}/>
                  <EventCategoryPressable name={'3km'} categoryFilterArray={updatedCategoryFilter}/>
                </View>
              </View>
            </View>

            <PrimaryButton onPress={applyFilterHandler} label={"Apply Filter"}/>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.neutral.backgroundBlack,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(33,33,33,0.7)',
  },

  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.neutral.backgroundBlack,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    rowGap: 40,
  },

  eventsFilterHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: colors.neutral.outlineGrey,
    paddingVertical: 15,
  },

  eventsFilterHeaderContainerTitle: {
    fontSize: fontSize.subtitle2,
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    color: colors.neutral.surfaceWhite,
  },

  eventsFilterHeaderContainerButtons: {
    fontSize: fontSize.subtitle2,
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    color: colors.neutral.surfaceWhite,
    borderBottomColor: 'rgba(12,25,88,0)',
  },

  eventsFilterContainer: {
    flexDirection: 'column',
    rowGap: 10,
  },

  eventsFilterContainerTitle: {
    fontSize: fontSize.subtitle1,
    fontFamily: fontFamily.subtitle,
    fontWeight: fontWeightSubtitle,
    color: colors.neutral.surfaceWhite,
  },

  eventsFilterPressableContainer: {
    flexDirection: "column",
    rowGap: 20,
  },  

  eventsFilterPressableContainerRow: {
    flexDirection: 'row',
    columnGap: 10,
  },

  eventsFilterPressable: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.secondaryGreenLight,
    borderRadius: 22,
    borderWidth: 2,
    height: 42,
  },

  eventsFilterPressableText: {
    color: colors.secondaryGreenLight,
    fontFamily: fontFamily.subtitle,
    fontSize: fontSize.subtitle2,
    fontWeight: fontWeightSubtitle,
    lineHeight: 18,
  },

  eventsFilterPressableActive: {
    borderColor: colors.secondaryGreenDark,
    color: colors.secondaryGreenDark,
  },
});

export default FilterCategory;
