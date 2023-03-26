
import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";

const DataVisualization = () => {
  const days = [
    { day: "MON" },
    { day: "TUE" },
    { day: "WED" },
    { day: "THU" },
    { day: "FRI" },
    { day: "SAT" },
    { day: "SUN" },
  ];

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

  const data = [
    { day: "MON", value: 5 },
    { day: "TUE", value: 6 },
    { day: "WED", value: 4 },
    { day: "THU", value: 10 },
    { day: "FRI", value: 8 },
    { day: "SAT", value: 7 },
    { day: "SUN", value: 10 },
  ];


  return (
    <View style={styles.container}>
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
            barWidth={20}cornerRadius={{bottomLeft:(0), bottomRight:(0), topLeft:(10), topRight:(10)}}
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
                          console.log(data.datum);
                          // setSelectedBar(data?.datum);
                          return {
                            style: { fill: colors.secondaryGreenDark  },
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
});

export default DataVisualization;