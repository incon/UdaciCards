export const STORE_DECKS = "STORE_DECKS";
export const ADD_DECK = "ADD_DECK";

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
