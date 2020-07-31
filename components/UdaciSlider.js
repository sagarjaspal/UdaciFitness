import React from "react";
import { View, Slider, Text } from "react-native";

const UdaciSlider = ({ step, max, value, unit, onChange }) => {
  return (
    <View>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
};

export default UdaciSlider;
