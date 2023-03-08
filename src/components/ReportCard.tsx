import { View, StyleSheet, Text } from 'react-native';

import { colors } from "../styles/colors";
import { fontSize, fontFamily, fontWeightSubtitle } from "../styles/fonts";

const ReportCard = (props: { date: string; eventNumber: number; participantsQty: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.info}>{props.date}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Event Number</Text>
        <Text style={styles.info}>{props.eventNumber}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Event Participants</Text>
        <Text style={styles.info}>{props.participantsQty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.netural.surfaceBlack,
    justifyContent: 'space-between',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.caption,
    color: colors.netural.surfaceWhite,
    textAlign: 'center',
  },
  info: {
    fontWeight: fontWeightSubtitle,
    fontSize: fontSize.subtitle2,
    color: colors.netural.outlineGrey,
  },
});

export default ReportCard;
