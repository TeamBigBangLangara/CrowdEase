import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getEvents } from "../api/event";
import {  useQuery } from "react-query";
import { getDate } from "../utils/getDate";

const WeekManagerScreen = () => {
  const { week, } = getDate();
  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );
  const data = [
      { day: "MON", value: 0, participant:0, },
      { day: "TUE", value: 0, participant:0,},
      { day: "WED", value: 0, participant:0,},
      { day: "THU", value: 0, participant:0,},
      { day: "FRI", value: 0, participant:0,},
      { day: "SAT", value: 0, participant:0,},
      { day: "SUN", value: 0, participant:0,}
  ];

  requestEvents.data?.forEach((event) => {
    for (let i = 0; i < 7; i++) {
      if (event.dates.date === week[i]) {
        data[i].value += (event.participants)/15555;
        data[i].participant += event.participants;
      }
    }
  });
  return (
    <>
    <View style={styles.wrapper}>
      
      <Text style={styles.tsize}>Weekly Event Preview</Text>
      <FlatList
        data={data}
        renderItem={({ item, }) =>
        <ScrollView>
          <View style={styles.WeeklyEventContainer} key={Math.random()}>
      
            <View style={styles.item}>
              <Text style={styles.FSize}>Date</Text>
              <Text style={styles.HFsize}>{item.day}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.FSize}>Event Number</Text>
            <Text style={styles.HFsize}>{item.value}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.FSize}>Event Participants</Text>
              <Text style={styles.HFsize}>{item.participant}</Text>
            </View>
          </View>
        </ScrollView>
        }
       />
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  tsize:{
    fontSize:24,
  },
  WeeklyEventContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    width: 353,
    height: 76,
    borderRadius:22,
    backgroundColor:'#121214',
    alignItems: 'center',
    margin:5,


  },
  item:{
    alignItems: 'center',
    color:'white',
  },
  FSize:{
    fontSize:12,
    color:'white',
  },
  HFsize:{
    fontSize:16,
    color:'white',
  },
});

export default WeekManagerScreen;
