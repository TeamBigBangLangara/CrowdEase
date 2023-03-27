import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getEvents } from "../api/event";
import {  useQuery } from "react-query";
import _ from 'lodash';
import moment from 'moment';


const getWeeklyEvents = (start: number, end: number): Promise<any> => new Promise(async (res, rej) => {
 try {
  const eventData = await getEvents();
  const dataByDate = _.countBy(eventData, (o) => o.dates.date);
  
  const startDate = moment().startOf('day').isoWeekday(start);
  const endDate = moment().startOf('day').isoWeekday(end);
  const finalData: {date: moment.Moment, events: number}[] = [];
  const sortedFinalData: {date: string, events: number}[] = [];
  Object.keys(dataByDate).forEach((key) => {
    if (moment(key).isAfter(startDate) && moment(key).isBefore(endDate)) {
      finalData.push({
        date: moment(key),
        events: dataByDate[key],
      });
    }
  });


  // sort the data by date using moment.js
  let sortedData = finalData.sort(function (a, b) {
    return moment(a.date).diff(moment(b.date));
  });
  

  sortedData.forEach((val) => {
    sortedFinalData.push({date: moment(val.date).format('MMMM DD, ddd'), events: val.events,});
  });


  res(sortedFinalData);
 } catch {
  rej(new Error('Data cannot be fetched with API'));
 }
}); 





const WeekManagerScreen = () => {
  const [startingDate, setStartingDate] = useState<number>(0);
  const [endingDate, setEndingDate] = useState<number>(8);
  const {data, isLoading, } = useQuery('weeklyEvents', async () => await getWeeklyEvents(startingDate, endingDate));
  const renderEvent = () => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, }) =>
        <ScrollView>
          <View style={styles.WeeklyEventContainer} key={Math.random()}>
      
            <View style={styles.item}>
              <Text style={styles.FSize}>Date</Text>
              <Text style={styles.HFsize}>{item.date}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.FSize}>Event Number</Text>
            <Text style={styles.HFsize}>{item.events}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.FSize}>Event Participants</Text>
              <Text style={styles.HFsize}>{item.events * 15000}</Text>
            </View>
          </View>
        </ScrollView>
        }
      />
    );
  };
  return (
    <>
    <View style={styles.wrapper}>
      
      <Text style={styles.tsize}>Weekly Event Preview</Text>
      {isLoading ? <Text>Data is fetching</Text> : renderEvent()}  
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
