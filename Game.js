import Player from "./Player.js";
import Deck from "./Deck.js";
/*  Game Class
    Class that models a Game of WAR.
    author: Patrick Murray

*/
class Game {
  /*******************/
  /* Class Proprties */
  p1Card;
  p2Card;
  gameDeck;
  Player1;
  Player2;
  outputArr = [];

  /*****************/
  /* Class Methods */
  constructor() {
    this.gameDeck = new Deck();
    this.Player1 = new Player();
    this.Player2 = new Player();
    this.outputArr = [];
  }

  dealCards() {
    while (this.gameDeck.cardStack.length > 0) {
      this.Player1.drawCard(this.gameDeck.dealCard());
      this.Player2.drawCard(this.gameDeck.dealCard());
    }
  }

  playGame() {
    while (
      this.Player1.remainingCards() > 0 &&
      this.Player2.remainingCards() > 0
    ) {
      this.p1Card = this.Player1.playCard();
      this.p2Card = this.Player2.playCard();

      //Player 1 has higher card
      if (this.p1Card.getPointValue() > this.p2Card.getPointValue()) {
        this.Player1.addPoint();
        this.outputArr.push({
          Player1: this.p1Card.getDisplayValue(),
          Player2: this.p2Card.getDisplayValue(),
          Result: "Player 1 Scores a Point!",
        });
      }
      //Player 2 has higher card
      else if (this.p1Card.getPointValue() < this.p2Card.getPointValue()) {
        this.Player2.addPoint();
        this.outputArr.push({
          Player1: this.p1Card.getDisplayValue(),
          Player2: this.p2Card.getDisplayValue(),
          Result: "Player 2 Scores a Point!",
        });
      }
      //Player have equal cards
      else {
        this.outputArr.push({
          Player1: this.p1Card.getDisplayValue(),
          Player2: this.p2Card.getDisplayValue(),
          Result: "No Points awarded.",
        });
      }
    }
  }

  displayResults() {
    console.clear();
    console.table(this.outputArr);
    console.log(
      `Final Score: P1: ${this.Player1.getScore()} | P2: ${this.Player2.getScore()}`
    );

    if (this.Player1.getScore() > this.Player2.getScore()) {
      //player1 Wins
      console.log("Player 1 WINS!");
    } else if (this.Player1.getScore() < this.Player2.getScore()) {
      //player2 Wins
      console.log("Player 2 WINS!");
    } else {
      //TIE Game
      console.log("The match resulted in a TIE!");
    }
  }
}
export default Game;
