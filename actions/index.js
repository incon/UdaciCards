export const STORE_DECKS = "STORE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

export function storeDecks(decks) {
  return {
    type: STORE_DECKS,
    decks
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addQuestion(key, question) {
  return {
    type: ADD_QUESTION,
    key,
    question
  };
}
