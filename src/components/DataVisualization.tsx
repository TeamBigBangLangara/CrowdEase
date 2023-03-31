import { getEvents } from "../api/event";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from "victory-native";
import { colors } from "../styles/colors";
import { fontFamily, fontSize, fontWeightTitle } from "../styles/fonts";
import { getDate } from "../utils/getDate";
import IconText from "./IconText";

const DataVisualization = () => {
  const { week, } = getDate();
  const [selectedBar, setSelectedBar] = useState(45802);

  const requestEvents = useQuery("events", () => getEvents(),
  {
    onError: (error: TypeError) => {
      Alert.alert("Error", error.message);
    },
  }
  );

  const data = [
    { day: "MON", value: 5747, },
    { day: "TUE", value: 7043, },
    { day: "WED", value: 9139, },
    { day: "THU", value: 7632, },
    { day: "FRI", value: 12139, },
    { day: "SAT", value: 8654, },
    { day: "SUN", value: 5448, }
  ];
  // const data = [
  //   { day: "MON", value: 0, },
  //   { day: "TUE", value: 0, },
  //   { day: "WED", value: 0, },
  //   { day: "THU", value: 0, },
  //   { day: "FRI", value: 0, },
  //   { day: "SAT", value: 0, },
  //   { day: "SUN", value: 0, }
  // ];

  // requestEvents.data?.forEach((event) => {
  //   for (let i = 0; i < 7; i++) {
  //     if (event.dates.date === week[i]) {
  //       data[i].value += event.participants;
  //     }
  //   }
  // });

  // const weekParticipants = data.reduce((total, day) => total + day.value, 0);
  //
  // const [selectedBar, setSelectedBar] = useState(weekParticipants);

  const barChartSvg = {
    fill: colors.neutral.surfaceWhite,
  };

  const axisStyles = {
    axis: {
      stroke: colors.neutral.surfaceWhite,
    },
    tickLabels: {
      fontSize: fontSize.caption,
      fontFamily: fontFamily.body,
      fill: colors.neutral.surfaceWhite,
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
          tickLabelComponent={<VictoryLabel style={styles.xAxisSvg} />}
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
                        return fill === colors.neutral.surfaceWhite
                          ? colors.neutral.surfaceWhite
                          : { fill: colors.secondaryGreenDark, };
                      },
                    },
                    {
                      target: 'data',
                      mutation: (clickedData: { datum: { day: string, value: number } }) => {
                        setSelectedBar(data?.datum.value);
                        return {
                          style: { fill: colors.secondaryGreenDark, },
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

export default DataVisualization;
