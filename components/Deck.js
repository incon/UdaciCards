import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { connect } from "react-redux";
import { bg, white } from "../utils/colors";
import { material } from "react-native-typography";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params;
    return {
      title: navigation.state.params.deckKey,
      headerBackTitle: navigation.state.params.deckKey
    };
  };
  render() {
    const key = this.props.navigation.state.params.key;
    const deck = this.props.decks[key];
    const cards = deck.questions.length;
    return (
      <View style={{ flex: 1, backgroundColor: bg }}>
        <View style={styles.item}>
          <Text style={material.title}>{key}</Text>
          <Text style={material.caption}>
            {cards} {cards > 0 ? "Cards" : "Card"}
          </Text>
        </View>
        <View
          style={
            Platform.OS !== "ios" && {
              marginLeft: 24,
              marginRight: 24,
              marginBottom: 24
            }
          }
        >
          <Button
            title="Add Question"
            onPress={() =>
              this.props.navigation.navigate("AddQuestion", { key })
            }
          />
        </View>
        <View
          style={
            Platform.OS !== "ios" && {
              marginLeft: 24,
              marginRight: 24,
              marginBottom: 24
            }
          }
        >
          <Button title="Start Quiz" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 24,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 3,
    elevation: 8,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(Deck);
