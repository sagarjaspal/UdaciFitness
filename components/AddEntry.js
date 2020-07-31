import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import DateHeader from "./DateHeader";
import { getMetricMetaInfo } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 5,
    sleep: 0,
    eat: 0,
  };

  SubmitButton = () => (
    <TouchableOpacity onPress={this.onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );

  onPress = () =>
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    let count = this.state[metric] + step;
    this.setState({
      [metric]: count > max ? max : count,
    });
  };

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    let count = this.state[metric] - step;
    this.setState({
      [metric]: count < 0 ? 0 : count,
    });
  };

  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((metric) => {
          const { getIcon, type, ...rest } = metaInfo[metric];
          const value = this.state[metric];

          return (
            <View key={metric}>
              {getIcon()}
              {type === "steppers" ? (
                <UdaciSteppers
                  value={value}
                  onIncrement={(value) => this.increment(metric)}
                  onDecrement={(value) => this.decrement(metric)}
                  {...rest}
                />
              ) : (
                <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(metric, value)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <this.SubmitButton />
      </View>
    );
  }
}

export default AddEntry;
