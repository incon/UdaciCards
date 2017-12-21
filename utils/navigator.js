import { StackNavigator } from "react-navigation";
import Decks from "../components/Decks";
import Quiz from "../components/Quiz";
import AddDeck from "../components/AddDeck";
import AddQuestion from "../components/AddQuestion";
import Deck from "../components/Deck";
import { bg, title } from "./colors";

export const MainNavigator = StackNavigator(
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
