import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { bg, bgDarker, white } from "../utils/colors";
import { material } from "react-native-typography";
import { submitDeck } from "../utils/dataStore";
import { addDeck } from "../actions";
import { connect } from "react-redux";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      error: ""
    };
  }

  validate(title) {
    let error = "";
    if (Object.keys(this.props.decks).indexOf(title) !== -1) {
      error = "Title as already been used.";
    }
    if (title.length === 0) {
      error = "Title can not be empty.";
    }
    return error;
  }
  handleUpdate(title) {
    this.setState({ title, error: this.validate(title) });
  }

  addDeck() {
    const { dispatch } = this.props;
    const { title } = this.state;
    const error = this.validate(title);
    if (error.length === 0) {
      dispatch(addDeck(title));
      submitDeck(title);
      this.props.navigation.goBack();
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
        <Text style={[material.caption, { marginBottom: 4 }]}>Deck Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={{
            borderColor: error.length > 0 ? "red" : bgDarker,
            borderWidth: 1,
            borderRadius: 4,
            padding: 8,
            backgroundColor: white
          }}
          onChangeText={text => this.handleUpdate(text)}
        />
        {error.length > 0 && (
          <Text style={{ marginTop: 4, color: "red" }}>{error}</Text>
        )}
        <View style={{ height: 16 }} />
        <Button
          disabled={error.length > 0}
          title="Add Deck"
          onPress={() => this.addDeck()}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}
export default connect(mapStateToProps)(AddDeck);
