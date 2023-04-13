import { getEvents } from "../api/bigBangAPI/JsonEvents";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useQuery } from "react-query";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { getDate } from "../utils/getDate";
import { fontWeightTitle } from '../styles/fonts';
import IconText from "./IconText";

const DataVisualization = (props: {isDark: boolean}) => {
  const { week, } = getDate();
  
  const requestEvents = useQuery("events", () => getEvents(),
  {
    onError: (error: TypeError) => {
      Alert.alert("Error", error.message);
    },
  }
  );
  
  const data = [
    { day: "MON", value: 0, },
    { day: "TUE", value: 0, },
    { day: "WED", value: 0, },
    { day: "THU", value: 0, },
    { day: "FRI", value: 0, },
    { day: "SAT", value: 0, },
    { day: "SUN", value: 0, }
  ];
  
  requestEvents.data?.forEach((event: { dates: { date: string; }; participants: number; }) => {
    for (let i = 0; i < 7; i++) {
      if (event.dates.date === week[i]) {
        data[i].value += event.participants;
      }
    }
  });
  
  const weekParticipants = data.reduce((total, day) => total + day.value, 0);
 
  const [selectedBar, setSelectedBar] = useState(weekParticipants);

  const barChartSvg = {
    fill: props.isDark ? colors.neutral.surfaceWhite : colors.neutral.grey,
  };

  const axisStyles = {
    axis: {
      stroke: props.isDark ? colors.neutral.surfaceWhite : colors.neutral.grey,
    },
    tickLabels: {
      fontSize: fontSize.caption,
      fontFamily: fontFamily.body,
      fill: props.isDark ? colors.neutral.surfaceWhite : colors.neutral.grey,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.participantsNumberContainer}>
        <IconText icon={props.isDark ? require('../assets/icons/participants.png') : require('../assets/icons/lightMode/Participants.png')} text={'Total participants:'} style={styles.participantIcon} isDark={props.isDark} />
        <Text style={props.isDark ? styles.participantsNumber : lightModeStyles.participantsNumber}>{selectedBar}</Text>
      </View>
      <VictoryChart height={200}>
        <VictoryAxis
          style={axisStyles}
          tickLabelComponent={<VictoryLabel style={props.isDark ? styles.xAxisSvg : lightModeStyles.xAxisSvg} />}
        />
        <VictoryBar
          data={data}
          x="day"
          y="value"
          style={{ data: barChartSvg, }}
          barWidth={20} cornerRadius={{ bottomLeft: (0), bottomRight: (0), topLeft: (10), topRight: (10), }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: (event, data) => {
                  return [
                    {
                      target: 'data',
                      eventKey: 'all',
                      mutation: (props: any, clickedData: { datum: { day: string, value: number } }) => {
                        const fill = props.style?.fill;
                        return props.isDark ?
                         fill === colors.neutral.surfaceWhite
                          ? colors.neutral.surfaceWhite
                          : { fill: colors.secondaryGreenDark, } : 
                          fill === colors.neutral.grey
                          ? colors.neutral.grey
                          : { fill: colors.secondaryGreenLight, }
                        
                      },
                    },
                    {
                      target: 'data',
                      mutation: (clickedData: { datum: { day: string, value: number } }) => {
                        setSelectedBar(data?.datum.value);
                        return {
                          style: { fill: props.isDark ? colors.secondaryGreenDark : colors.secondaryGreenLight },
                        };
                      },
                    }
                  ];
                },
              },
            }
          ]}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
  },
  xAxisSvg: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.body,
    fill: colors.neutral.surfaceWhite,
  },
  participantsNumberContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
    marginTop: 4,
    marginLeft: 20,
  },
  participantsNumber: {
    color: colors.secondaryGreenDark,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightTitle,
  },
  participantIcon: {
    alignItems: "center",
  },
});

const lightModeStyles = StyleSheet.create({
  xAxisSvg: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.body,
    fill: colors.neutral.grey,
  },
  participantsNumber: {
    color: colors.secondaryGreenLight,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightTitle,
  },
});

export default DataVisualization;
