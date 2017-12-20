import { STORE_DECKS, ADD_DECK, ADD_QUESTION } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case STORE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.key]: {
          ...[action.key],
          questions: state[action.key].questions.concat(action.question)
        }
      };
    default:
      return state;
  }
}

export default decks;
