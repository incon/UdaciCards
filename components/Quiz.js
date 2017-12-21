import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { connect } from "react-redux";
import { bg, white } from "../utils/colors";
import { material } from "react-native-typography";
import materialColors from "react-native-typography/src/helpers/materialColors";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      score: 0,
      screen: "question"
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params;
    return {
      title: navigation.state.params.deckKey,
      headerBackTitle: navigation.state.params.deckKey
    };
  };
  status() {
    const key = this.props.navigation.state.params.key;
    const deck = this.props.decks[key];
    return (
      <Text style={[material.caption, { paddingTop: 16, paddingBottom: 16 }]}>
        {this.state.progress + 1} of {deck.questions.length}
      </Text>
    );
  }
  render() {
    const key = this.props.navigation.state.params.key;
    const deck = this.props.decks[key];
    const card = deck.questions[this.state.progress];
    const length = deck.questions.length;
    const { screen } = this.state;

    if (screen === "question") {
      return (
        <View style={{ flex: 1, backgroundColor: bg }}>
          <View style={styles.item}>
            <Text style={[material.title, { textAlign: "center" }]}>
              {card.question}
            </Text>
            {this.status()}
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
              title="Show Answer"
              onPress={() => this.setState({ screen: "answer" })}
            />
          </View>
        </View>
      );
    }

    if (screen === "answer") {
      return (
        <View style={{ flex: 1, backgroundColor: bg }}>
          <View style={styles.item}>
            <Text style={[material.title, { textAlign: "center" }]}>
              {card.answer}
            </Text>
            {this.status()}
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
              title="Correct"
              onPress={() => {
                if (this.state.progress === length - 1) {
                  this.setState(prevState => ({
                    score: prevState.score + 1,
                    screen: "completed"
                  }));
                } else {
                  this.setState(prevState => ({
                    score: prevState.score + 1,
                    progress: prevState.progress + 1,
                    screen: "question"
                  }));
                }
              }}
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
            <Button
              title="Incorrect"
              onPress={() => {
                if (this.state.progress === length - 1) {
                  this.setState(prevState => ({
                    screen: "completed"
                  }));
                } else {
                  this.setState(prevState => ({
                    progress: prevState.progress + 1,
                    screen: "question"
                  }));
                }
              }}
            />
          </View>
        </View>
      );
    }

    if (screen === "completed") {
      const percent = Math.floor(this.state.score / length * 100);
      return (
        <View style={{ flex: 1, backgroundColor: bg }}>
          <Text
            style={[
              material.display3,
              {
                color: materialColors.blackPrimary,
                textAlign: "center",
                paddingBottom: 24
              }
            ]}
          >
            {percent}%
            {percent < 50 && "👎"}
            {percent === 50 && "😬"}
            {percent > 50 && "🎉"}
          </Text>
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
              title="Restart Quiz"
              onPress={() =>
                this.setState({
                  progress: 0,
                  score: 0,
                  screen: "question"
                })
              }
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 2,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    marginLeft: 24,
    marginRight: 24,
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
export default connect(mapStateToProps)(Quiz);
