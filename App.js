import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { bg, title } from "./utils/colors";
import { StackNavigator } from "react-navigation";
import Decks from "./components/Decks";
import Quiz from "./components/Quiz";
import AddDeck from "./components/AddDeck";
import AddQuestion from "./components/AddQuestion";
import Deck from "./components/Deck";
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
    },
    AddQuestion: {
      screen: AddQuestion,
      navigationOptions: {
        title: "Add Question"
      }
    },
    Deck: {
      screen: Deck
    },
    Quiz: {
      screen: Quiz
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
