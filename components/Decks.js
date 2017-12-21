import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { material } from "react-native-typography";
import { MaterialIcons } from "@expo/vector-icons";
import { white, bg, bgDarker, title } from "../utils/colors";
import { Svg } from "expo";
import { getDecks } from "../utils/dataStore";
import { connect } from "react-redux";
import { storeDecks } from "../actions";

class Decks extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight:
        Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={params.handleAddDeck ? params.handleAddDeck : () => null}
          >
            <MaterialIcons
              name="add"
              size={20}
              color={title}
              style={{ paddingRight: 16 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableNativeFeedback
            onPress={params.handleAddDeck ? params.handleAddDeck : () => null}
            background={TouchableNativeFeedback.Ripple(bgDarker, true)}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bg,
                marginRight: 16
              }}
            >
              <MaterialIcons name="add" size={20} color={title} />
            </View>
          </TouchableNativeFeedback>
        )
    };
  };

  handleAddDeck = () => {
    this.props.navigation.navigate("AddDeck", {
      onNavigateBack: this.handleOnNavigateBack
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(storeDecks(decks)));
    this.props.navigation.setParams({ handleAddDeck: this.handleAddDeck });
  }

  listDecks() {
    const decks = Object.keys(this.props.decks).reduce((decks, key) => {
      return [...decks, { key, cards: this.props.decks[key].questions.length }];
    }, []);
    if (decks.length > 0) {
      return decks.map(deck => (
        <TouchableWithoutFeedback
          key={deck.key}
          onPress={() =>
            this.props.navigation.navigate("Deck", { key: deck.key })
          }
        >
          <View style={styles.item}>
            <Text style={material.title}>{deck.key}</Text>
            <Text style={material.caption}>
              {deck.cards} {deck.cards > 0 ? "Cards" : "Card"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ));
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.main, { backgroundColor: bg }]}>
          {this.listDecks()}
          <View style={{ height: 24 }} />
        </ScrollView>
        <View style={{ position: "absolute", width: "100%", height: 16 }}>
          <Svg width="100%" height="24">
            <Svg.Defs>
              <Svg.LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
                <Svg.Stop offset="0" stopColor={bg} stopOpacity="1" />
                <Svg.Stop offset="1" stopColor={bg} stopOpacity="0" />
              </Svg.LinearGradient>
            </Svg.Defs>
            <Svg.Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#grad)"
            />
          </Svg>
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
export default connect(mapStateToProps)(Decks);
