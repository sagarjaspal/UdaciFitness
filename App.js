import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { View } from "react-native";

import reducer from "./reducers";
import AddEntry from "./components/AddEntry";

export default function App() {
  return (
    <Provider store={createStore(reducer, applyMiddleware(logger))}>
      <View style={{ flex: 1 }}>
        <AddEntry />
      </View>
    </Provider>
  );
}
