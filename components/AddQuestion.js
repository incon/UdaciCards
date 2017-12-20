import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { bg, bgDarker, white } from "../utils/colors";
import { material } from "react-native-typography";
import { submitQuestion } from "../utils/dataStore";
import { addQuestion } from "../actions";
import { connect } from "react-redux";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      errors: {
        question: "",
        answer: ""
      }
    };
    this.fields = ["question", "answer"];
  }

  validate(field, value) {
    let error = {};
    if (value.length === 0) {
      error = field[0].toUpperCase() + field.substr(1) + " can not be empty.";
    }
    return error;
  }
  handleUpdate(field, value) {
    this.setState(prevState => ({
      [field]: value,
      errors: { ...prevState.errors, [field]: this.validate(field, value) }
    }));
  }

  addQuestion() {
    const { dispatch } = this.props;
    const { key } = this.props.navigation.state.params;
    const errors = this.fields.reduce(
      (errors, field) => ({
        ...errors,
        [field]: this.validate(field, this.state[field])
      }),
      {}
    );
    const valid =
      this.fields.filter(field => this.state[field].length === 0).length === 0;
    const question = this.fields.reduce(
      (question, field) => ({ ...question, [field]: this.state[field] }),
      {}
    );
    if (valid) {
      dispatch(addQuestion(key, question));
      submitQuestion(key, question);
      this.props.navigation.goBack();
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
        <Text style={[material.caption, { marginBottom: 4 }]}>Question</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={{
            borderColor: errors.question.length > 0 ? "red" : bgDarker,
            borderWidth: 1,
            borderRadius: 4,
            padding: 8,
            backgroundColor: white
          }}
          onChangeText={text => this.handleUpdate("question", text)}
        />
        {errors.question.length > 0 && (
          <Text style={{ marginTop: 4, color: "red" }}>{errors.question}</Text>
        )}

        <Text style={[material.caption, { marginBottom: 4, marginTop: 4 }]}>
          Answer
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={{
            borderColor: errors.answer.length > 0 ? "red" : bgDarker,
            borderWidth: 1,
            borderRadius: 4,
            padding: 8,
            backgroundColor: white
          }}
          onChangeText={text => this.handleUpdate("answer", text)}
        />
        {errors.answer.length > 0 && (
          <Text style={{ marginTop: 4, color: "red" }}>{errors.answer}</Text>
        )}

        <View style={{ height: 16 }} />
        <Button
          disabled={errors.question.length > 0}
          title="Add Question"
          onPress={() => this.addQuestion()}
        />
      </View>
    );
  }
}

export default connect(null)(AddQuestion);
