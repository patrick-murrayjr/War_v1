import Player from "./Player.js";
import Deck from "./Deck.js";
/*  Game Class
    Class that models a Game of WAR.
    author: Patrick Murray

*/
class Game {
  /*******************/
  /* Class Proprties */
  /* private */
  #p1Card;
  #p2Card;
  #gameDeck;
  #player1;
  #player2;
  #outputArr = [];

  /*****************/
  /* Class Methods */
  constructor() {
    this.#gameDeck = new Deck();
    this.#player1 = new Player();
    this.#player2 = new Player();
    this.#outputArr = [];
  }
  // dealCards - Deals every card from the deck to each player in turn
  // The player object will use the draw function to place teh dealt card in their hand
  dealCards() {
    while (this.#gameDeck.remainingCards() > 0) {
      this.#player1.drawCard(this.#gameDeck.dealCard());
      this.#player2.drawCard(this.#gameDeck.dealCard());
    }
  }

  // playGame - each player will play the top card from their hand
  // then a comparison wil be made using the method Card.getPointValue() to determine
  // who wins the round. Winning player scores one point, ties score no points
  // Then an object will created to hold the each player's card display value and the
  // result of the round and pushed into an array to store each round of play
  playGame() {
    while (this.#player1.remainingCards() > 0 && this.#player2.remainingCards() > 0) {
      this.#p1Card = this.#player1.playCard();
      this.#p2Card = this.#player2.playCard();

      //Player 1 has higher card
      if (this.#p1Card.getPointValue() > this.#p2Card.getPointValue()) {
        this.#player1.addPoint();
        this.#outputArr.push({
          Player1: this.#p1Card.getDisplayValue(),
          Player2: this.#p2Card.getDisplayValue(),
          Result: "Player 1 Scores a Point!",
        });
      }
      //Player 2 has higher card
      else if (this.#p1Card.getPointValue() < this.#p2Card.getPointValue()) {
        this.#player2.addPoint();
        this.#outputArr.push({
          Player1: this.#p1Card.getDisplayValue(),
          Player2: this.#p2Card.getDisplayValue(),
          Result: "Player 2 Scores a Point!",
        });
      }
      //Players have equal cards
      else {
        this.#outputArr.push({
          Player1: this.#p1Card.getDisplayValue(),
          Player2: this.#p2Card.getDisplayValue(),
          Result: "No Points awarded.",
        });
      }
    }
  }

  //displayResults - This method will clear the console and then output each round played in a table format
  // The total points scored for each player are then displayed and finally the winner is determined.
  displayResults() {
    console.clear();
    console.table(this.#outputArr);
    console.log(`Final Score: P1: ${this.#player1.getScore()} | P2: ${this.#player2.getScore()}`);

    if (this.#player1.getScore() > this.#player2.getScore()) {
      //player1 Wins
      console.log("Player 1 WINS!");
    } else if (this.#player1.getScore() < this.#player2.getScore()) {
      //player2 Wins
      console.log("Player 2 WINS!");
    } else {
      //TIE Game
      console.log("The match resulted in a TIE!");
    }
  }
}
export default Game;
