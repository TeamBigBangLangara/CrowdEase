import { BarChart, XAxis } from "react-native-svg-charts";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";
import { fontFamily, fontSize } from "../styles/fonts";

const DataVisualization = () => {
  const days = [
    { label: "MON", },
    { label: "TUE", },
    { label: "WED", },
    { label: "THU", },
    { label: "FRI", },
    { label: "SAT", },
    { label: "SUN", }
  ];

  const textColor = {
    fill: colors.netural.surfaceWhite,
  };

  
  const barChartSvg = {
    fill: colors.secondaryGreenDark,
  };

  const data = [5, 6, 4, 10, 8, 7, 10];

  return (
    <View style={{ marginHorizontal: 1,}}>
      <BarChart
        spacingInner={0.6}
        style={styles.barChart}
        data={data}
        svg={{...barChartSvg}}
        contentInset={{ top: 20, }}
      >
      </BarChart>
      <XAxis
        data={days}
        formatLabel={(value: string, index:  number) => days[index].label}
        contentInset={{ left: 15, right: 15, }}
        style={styles.xaxis}
        svg={{...styles.xaxisSvg, ...textColor}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barChart: {
    height: 166,
    borderBottomWidth: 2,
    borderBottomColor: colors.netural.surfaceWhite,
  },
  xaxis: {
    marginTop: 2,
  },
  xaxisSvg: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.body,
    fill: colors.netural.surfaceWhite,
  },
});

export default DataVisualization;
