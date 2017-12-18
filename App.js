import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { bg, title } from "./utils/colors";
import { StackNavigator } from "react-navigation";
import Decks from "./Components/Decks";
import AddDeck from "./Components/AddDeck";

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
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={false}
          backgroundColor={bg}
          barStyle="dark-content"
        />
        <MainNavigator />
      </View>
    );
  }
}
