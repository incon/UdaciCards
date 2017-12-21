import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { bg, title } from "./utils/colors";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { setLocalNotification } from "./utils/notifications";
import { MainNavigator } from "./utils/navigator";

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <StatusBar
            translucent={false}
            backgroundColor={bg}
            barStyle="dark-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
