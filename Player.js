/*  Player Class
    Class that models a player.
    author: Patrick Murray

*/
class Player {
  /*******************/
  /* Class Proprties */
  cardStack = [];
  score;

  /*****************/
  /* Class Methods */
  constructor() {
    this.resetPlayer();
  }

  // resetPlayer - Initialises a player by clearing all cards from the cardStack and sets score to 0
  // Should be called before every game starts.
  resetPlayer() {
    this.cardStack = [];
    this.resetScore();
  }

  // addPoint - adds one point to the player's score
  addPoint() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }

  // getScore - retrieves the player's current score
  // returns a number
  getScore() {
    return this.score;
  }

  // drawCard - adds a card to the top of the player's card Stack
  drawCard(card) {
    this.cardStack.push(card);
  }

  // playCard - plays the top card from the player's card Stack
  // returns a Card object
  playCard() {
    if (this.cardStack.length > 0) {
      return this.cardStack.pop();
    }
  }

  // remainingCards - Returns the number of cards remaining in the player's stack
  // returns a number
  remainingCards() {
    return this.cardStack.length;
  }

  // showStack - debugging function to display all cards in the player's stack
  showStack() {
    if (this.cardStack.length > 0) {
      for (let i = 0; i < this.cardStack.length; i++) {
        console.log(
          `Card: ${this.cardStack[i].getDisplayValue()} ${this.cardStack[
            i
          ].getPointValue()}`
        );
      }
    }
  }

  // showTopCard - debugging function to display the top card in the player's stack
  showTopCard() {
    if (this.cardStack.length > 0) {
      console.log(
        `PTop: ${this.cardStack[this.cardStack.length - 1].getDisplayValue()}`
      );
    }
  }
}
export default Player;
