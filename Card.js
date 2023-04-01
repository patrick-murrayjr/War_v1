/*  Card Class
    Models a playing card.
    author: Patrick Murray

    Required arguments:
    argument {String} rank - The Rank (face value) of the card
    argument {String} suit - The Suit (Spades, Diamond, etc..) of the card.
    argument {Number} pointValue - Used for comparing which card outranks another card.

*/
class Card {
  rank;
  suit;
  displayValue;
  pointValue;

  constructor(rank, suit, pointValue) {
    this.rank = rank;
    this.suit = suit;
    this.displayValue = rank + suit;
    // Used for comparing which card outranks another
    this.pointValue = pointValue;
  }

  //getRank -  returns the rank(face value) of the card
  getRank() {
    return this.rank;
  }

  //getSuit -  returns the suit(ex. C for Clubs, D for Diamonds) of the card
  getSuit() {
    return this.suit;
  }

  //getDisplayValue -  returns the rank and suit of the card in the format Rank-Suit (ex. AS => Ace of Spades)
  getDisplayValue() {
    return this.displayValue;
  }
  //getPointValue -  returns the point value assigned to the card used for comparing which card outranks another
  getPointValue() {
    return this.pointValue;
  }
}
export default Card;
