
import { getEvents } from "../api/event";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useQuery } from "react-query";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";
import { getDate } from "../utils/getDate";
import { fontWeightTitle } from '../styles/fonts'
import IconText from "./IconText";

const DataVisualization = () => {
  const { week } = getDate();

  const [dateFilter, setDateFilter] = useState(week[0])
  const [selectedBar, setSelectedBar] = useState(0)

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const data = [
    { day: "MON", value: 0 },
    { day: "TUE", value: 0 },
    { day: "WED", value: 0 },
    { day: "THU", value: 0 },
    { day: "FRI", value: 0 },
    { day: "SAT", value: 0 },
    { day: "SUN", value: 0 },
  ];

  requestEvents.data?.forEach((event) => {
    for (let i = 0; i < 7; i++) {
      if (event.dates.date === week[i]) {
        data[i].value += event.participants;
      }
    }
  });


  const barChartSvg = {
    fill: colors.netural.surfaceWhite,
  };

  const axisStyles = {
    axis: {
      stroke: colors.netural.surfaceWhite,
    },
    tickLabels: {
      fontSize: fontSize.caption,
      fontFamily: fontFamily.body,
      fill: colors.netural.surfaceWhite,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.participantsNumberContainer}>
        <IconText icon={require('../assets/icons/participants.png')} text={'Total participants:'} style={styles.participantIcon} />
        <Text style={styles.participantsNumber}>{selectedBar}</Text>
      </View>
      <VictoryChart height={200}>
        <VictoryAxis
          style={axisStyles}
          tickLabelComponent={<VictoryLabel style={styles.xaxisSvg} />}
        />
        <VictoryBar
          data={data}
          x="day"
          y="value"
          style={{ data: barChartSvg }}
          barWidth={20} cornerRadius={{ bottomLeft: (0), bottomRight: (0), topLeft: (10), topRight: (10) }}
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
                        return fill === colors.netural.surfaceWhite
                          ? colors.netural.surfaceWhite
                          : { fill: colors.secondaryGreenDark };
                      },
                    },
                    {
                      target: 'data',
                      mutation: (props: any, clickedData: { datum: { day: string, value: number } }) => {
                        console.log(data.datum.value);
                        setSelectedBar(data?.datum.value);
                        return {
                          style: { fill: colors.secondaryGreenDark },
                        };
                      },
                    },
                  ];
                },
              },
            },
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
  xaxisSvg: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.body,
    fill: colors.netural.surfaceWhite,
  },
  participantsNumberContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
    marginTop: 4,
    marginLeft: 20
  },
  participantsNumber: {
    color: colors.secondaryGreenDark,
    fontFamily: fontFamily.heading,
    fontSize: fontSize.heading2,
    fontWeight: fontWeightTitle,
  },
  participantIcon: {
    alignItems: "center",
  }
});

export default DataVisualization;