import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { white, purple, gray } from "../utils/colors";

const UdaciSteppers = ({ value, onIncrement, onDecrement, unit }) => {
  return (
    <View style={styles.row}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onDecrement}
          >
            <Entypo name="minus" size={35} color={purple} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onIncrement}
          >
            <Entypo name="plus" size={35} color={purple} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.androidBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onDecrement}
          >
            <FontAwesome name="minus" size={35} color={white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.androidBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onIncrement}
          >
            <FontAwesome name="plus" size={35} color={white} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24 }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderRadius: 2,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    backgroundColor: purple,
    borderRadius: 2,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  metricCounter: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
  },
});

export default UdaciSteppers;
