import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DateHeader from "./DateHeader";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import TextButton from "./TextButton";

import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import { addItem, removeItem } from "../utils/api";
import { addEntry } from "../actions";
import { purple, white } from "../utils/colors";

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 5,
    sleep: 0,
    eat: 0,
  };

  SubmitButton = () => (
    <TouchableOpacity
      style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
      onPress={this.onSubmit}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );

  onSubmit = () => {
    const key = timeToString();
    const { addEntry } = this.props;

    addEntry({ [key]: this.state });

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    addItem(this.state, key);
  };

  onReset = () => {
    const key = timeToString();
    const { addEntry } = this.props;

    addEntry({
      [key]: {
        today: "👋 Don't forget to log your data today",
      },
    });

    removeItem(key);
  };

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
    const { alreadyLogged } = this.props;

    if (alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
            size={100}
            color="black"
          />
          <Text>You already logged your information for today</Text>
          <TextButton style={{ padding: 10 }} onPress={this.onReset}>
            Reset
          </TextButton>
        </View>
      );
    }

    const metaInfo = getMetricMetaInfo();
    return (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((metric) => {
          const { getIcon, type, ...rest } = metaInfo[metric];
          const value = this.state[metric];

          return (
            <View key={metric} style={styles.row}>
              <View>{getIcon()}</View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8,
    height: 45,
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 4,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addEntry }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
