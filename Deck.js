import Card from "./Card.js";

/*  Deck Class
    Models a deck of playing cards. 
    Assumes a standard 52 card deck with 4 suits and no special cards (ex. Joker)
    author: Patrick Murray

*/
class Deck {
  /*******************/
  /* Class Proprties */
  cardStack = [];
  numRanks;
  numSuits;

  /*****************/
  /* Class Methods */
  constructor() {
    this.numRanks = 13;
    this.numSuits = 4;
    this.resetDeck();
  }

  // resetDeck - Initialises and shuffles the deck. Should be called before every game starts.
  resetDeck() {
    this.cardStack = [];
    this.initialiseDeck();
    this.shuffle();
  }

  // initialiseDeck - populates the deck with all 52 cards, 13 of each suit, in rank order
  // generates a Rank, Suit and PointValue for each card in the deck
  // shuffle() shoud be called after initialiseDeck.
  initialiseDeck() {
    let suit;
    for (let j = 0; j < this.numSuits; j++) {
      switch (j) {
        case 0:
          suit = "H";
          break;
        case 1:
          suit = "C";
          break;
        case 2:
          suit = "D";
          break;
        case 3:
          suit = "S";
          break;
        default:
          break;
      }

      // Creates a new Card Object using (rank, suit, pointValue) and adds it to the cardStack
      for (let i = 0; i < this.numRanks; i++) {
        switch (i) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            this.cardStack.push(new Card(i + 2, suit, i + 2));
            break;
          case 9:
            this.cardStack.push(new Card("J", suit, i + 2));
            break;
          case 10:
            this.cardStack.push(new Card("Q", suit, i + 2));
            break;
          case 11:
            this.cardStack.push(new Card("K", suit, i + 2));
            break;
          case 12:
            this.cardStack.push(new Card("A", suit, i + 2));
            break;
          default:
            break;
        }
      }
    }
  }

  // shuffle - shuffles the cards in the deck
  // Iterates forward through the deck, the card at each index will be swapped
  // with a randomly chosen card until all cards have swapped at least once
  // shuffle() shoud be called after initialiseDeck.
  shuffle() {
    if (this.cardStack.length > 0) {
      let rndIndex;
      for (let i = 0; i < this.cardStack.length; i++) {
        rndIndex = Math.floor(Math.random() * this.cardStack.length);
        this.#swap(i, rndIndex);
      }
    }
  }

  // swap - Private helper function used to swap cards during shufflling
  #swap(indexTo, indexFrom) {
    let tempCard = this.cardStack[indexTo];
    this.cardStack[indexTo] = this.cardStack[indexFrom];
    this.cardStack[indexFrom] = tempCard;
  }

  // dealCard - Deals the top card from the deck
  // returns a Card object
  dealCard() {
    if (this.cardStack.length > 0) {
      return this.cardStack.pop();
    }
  }

  // remainingCards - Returns the number of cards remaining in the deck
  // returns a number
  remainingCards() {
    return this.cardStack.length;
  }

  // showDeck - debugging function to display all cards in the deck
  showDeck() {
    for (let i = 0; i < this.cardStack.length; i++) {
      console.log(
        `Card: ${this.cardStack[i].getDisplayValue()} ${this.cardStack[
          i
        ].getPointValue()}`
      );
    }
  }

  // showTopCard - debugging function to display the top card in the deck
  showTopCard() {
    if (this.cardStack.length > 0) {
      console.log(
        `DTop: ${this.cardStack[this.cardStack.length - 1].getDisplayValue()}`
      );
    }
  }
}
export default Deck;
