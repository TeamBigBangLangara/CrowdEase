import React from 'react';
import { Text } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";

const GradientText = (props: { style: object, colors: string[], start: any, end: any, text: string }) => {
  return (
    <LinearTextGradient
      style={props.style}
      locations={[0, 1]}
      colors={props.colors}
      start={props.start}
      end={props.end}
    >
      <Text>{props.text}</Text>
    </LinearTextGradient>
  )
};

export default GradientText;
