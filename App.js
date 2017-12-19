import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { bg, title } from "./utils/colors";
import { StackNavigator } from "react-navigation";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

const MainNavigator = StackNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        title: "Decks",
        headerBackTitle: null
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: "Add Deck"
      }
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: bg,
        elevation: 0,
        borderBottomWidth: 0
      },
      headerTintColor: title
    }
  }
);

export default class App extends Component {
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
