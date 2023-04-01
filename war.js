/*  Card Class
    Models a playing card.
    author: Patrick Murray

    Required arguments:
    argument {String} rank - The Rank (face value) of the card
    argument {String} suit - The Suit (Spades, Diamond, etc..) of the card.
    argument {Number} pointValue - Used for comparing which card outranks another card.

*/
class Card{
    rank;
    suit;
    displayValue;
    pointValue;

    constructor(rank, suit, pointValue){
        this.rank = rank;
        this.suit = suit;
        this.displayValue = rank + suit;
        // Used for comparing which card outranks another
        this.pointValue = pointValue;
    }

    //getRank -  returns the rank(face value) of the card
    getRank(){
        return this.rank;
    }

    //getSuit -  returns the suit(ex. C for Clubs, D for Diamonds) of the card
    getSuit(){
        return this.suit;
    }

    //getDisplayValue -  returns the rank and suit of the card in the format Rank-Suit (ex. AS => Ace of Spades)
    getDisplayValue(){
        return this.displayValue;
    }
    //getPointValue -  returns the point value assigned to the card used for comparing which card outranks another
    getPointValue(){
        return this.pointValue;
    }
}
 
/*  Deck Class
    Models a deck of playing cards. 
    Assumes a standard 52 card deck with 4 suits and no special cards (ex. Joker)
    author: Patrick Murray

*/
class Deck{
    cardStack = [];
    numRanks;
    numSuits;

    constructor(){
        this.numRanks = 13;
        this.numSuits = 4;
        this.resetDeck();
    }

    // resetDeck - Initialises and shuffles the deck. Should be called before every game starts.
    resetDeck(){
        this.cardStack = [];
        this.initialiseDeck();
        this.shuffle();
    }

    // initialiseDeck - populates the deck with all 52 cards, 13 of each suit, in rank order
    // generates a Rank, Suit and PointValue for each card in the deck
    // shuffle() shoud be called after initialiseDeck.
    initialiseDeck(){
        let suit;
        for(let j = 0; j < this.numSuits; j++){
            switch(j){
                case 0:
                    suit = 'H';
                    break;
                case 1:
                    suit = 'C';
                    break;
                case 2:
                    suit = 'D';
                    break;
                case 3:
                    suit = 'S';
                     break;
                default:
                    break;
            }
            
            // Creates a new Card Object using (rank, suit, pointValue) and adds it to the cardStack
            for(let i = 0; i < this.numRanks; i++){
                switch(i){
                    case 0:
                    case 1:
                    case 2: 
                    case 3:
                    case 4:
                    case 5: 
                    case 6:
                    case 7:
                    case 8:                                       
                        this.cardStack.push(new Card(i+2, suit, i+2));
                        break;
                    case 9:
                        this.cardStack.push(new Card('J', suit, i+2));
                        break;
                    case 10:
                        this.cardStack.push(new Card('Q', suit, i+2));
                        break;
                    case 11:
                        this.cardStack.push(new Card('K', suit, i+2));
                        break;
                    case 12:
                        this.cardStack.push(new Card('A', suit, i+2));
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
    shuffle(){
        if(this.cardStack.length > 0){
            let rndIndex;
            for(let i = 0; i < this.cardStack.length; i++){
                rndIndex = Math.floor(Math.random()*this.cardStack.length);
                this.#swap(i, rndIndex);
            }
        }
    }

    // swap - Private helper function used to swap cards during shufflling
    #swap(indexTo, indexFrom){
        let tempCard = this.cardStack[indexTo];
        this.cardStack[indexTo] = this.cardStack[indexFrom];
        this.cardStack[indexFrom] = tempCard;

    }

    // dealCard - Deals the top card from the deck
    // returns a Card object
    dealCard(){
        if(this.cardStack.length > 0){
            return this.cardStack.pop();
        }
    }

    // remainingCards - Returns the number of cards remaining in the deck
    // returns a number
    remainingCards(){
        return this.cardStack.length;
    }

    // showDeck - debugging function to display all cards in the deck
    showDeck(){
        for(let i = 0; i < this.cardStack.length; i++){
            console.log(`Card: ${this.cardStack[i].getDisplayValue()} ${this.cardStack[i].getPointValue()}`);
        }
    }

    // showTopCard - debugging function to display the top card in the deck
    showTopCard(){
        if(this.cardStack.length > 0){
            console.log(`DTop: ${this.cardStack[this.cardStack.length-1].getDisplayValue()}`);
        }
    }
}

/*  Player Class
    Class that models a player.
    author: Patrick Murray

*/
class Player{
    cardStack = [];
    score;

    constructor() {
        this.resetPlayer();
    }

    // resetPlayer - Initialises a player by clearing all cards from the cardStack and sets score to 0
    // Should be called before every game starts.
    resetPlayer(){
        this.cardStack = [];
        this.resetScore();
    }

    // addPoint - adds one point to the player's score
    addPoint(){
        this.score++;
    }

    resetScore(){
        this.score = 0;
    }

    // getScore - retrieves the player's current score
    // returns a number
    getScore(){
        return this.score;
    }

    // drawCard - adds a card to the top of the player's card Stack
    drawCard(card){
        this.cardStack.push(card);
    }

    // playCard - plays the top card from the player's card Stack
    // returns a Card object
    playCard(){
        if(this.cardStack.length > 0){
            return this.cardStack.pop();
        }
    }

    // remainingCards - Returns the number of cards remaining in the player's stack
    // returns a number
    remainingCards(){
        return this.cardStack.length;
    }

    // showStack - debugging function to display all cards in the player's stack
    showStack(){
        if(this.cardStack.length > 0){
            for(let i = 0; i< this.cardStack.length; i++){
                console.log(`Card: ${this.cardStack[i].getDisplayValue()} ${this.cardStack[i].getPointValue()}`);
            }
        }
    }

    // showTopCard - debugging function to display the top card in the player's stack
    showTopCard(){
        if(this.cardStack.length > 0){
            console.log(`PTop: ${this.cardStack[this.cardStack.length-1].getDisplayValue()}`);
        }
    }
}

/*  Game Class
    Class that models a Game of WAR.
    author: Patrick Murray

*/
class Game{
    p1Card;
    p2Card;
    gameDeck;
    Player1;
    Player2;
    outputArr = [];

    constructor(){
        this.gameDeck = new Deck();
        this.Player1 = new Player();
        this.Player2 = new Player();
        this.outputArr = [];
    }

    dealCards(){
        while(this.gameDeck.cardStack.length > 0){
            this.Player1.drawCard(this.gameDeck.dealCard());
            this.Player2.drawCard(this.gameDeck.dealCard());   
        }
    }

    playGame(){
        while(this.Player1.remainingCards() > 0 && this.Player2.remainingCards() > 0){
            this.p1Card = this.Player1.playCard();
            this.p2Card = this.Player2.playCard();
            
            //Player 1 has higher card
            if(this.p1Card.getPointValue() > this.p2Card.getPointValue()){
                this.Player1.addPoint();
                this.outputArr.push({
                    Player1:this.p1Card.getDisplayValue(),
                    Player2:this.p2Card.getDisplayValue(),
                    Result:'Player 1 Scores a Point!'
                });
            }
             //Player 2 has higher card
            else if(this.p1Card.getPointValue() < this.p2Card.getPointValue()){
                this.Player2.addPoint();
                this.outputArr.push({
                    Player1:this.p1Card.getDisplayValue(),
                    Player2:this.p2Card.getDisplayValue(),
                    Result:'Player 2 Scores a Point!'
                });
            }
             //Player have equal cards
            else{
                this.outputArr.push({
                    Player1:this.p1Card.getDisplayValue(),
                    Player2:this.p2Card.getDisplayValue(),
                    Result:'No Points awarded.'
                });
            }
        }
    }

    displayResults(){
        console.clear();
        console.table(this.outputArr);
        console.log(`Final Score: P1: ${this.Player1.getScore()} | P2: ${this.Player2.getScore()}`)

        if(this.Player1.getScore() > this.Player2.getScore()){
                //player1 Wins
                console.log("Player 1 WINS!");
            }
            else if(this.Player1.getScore() < this.Player2.getScore()){
                //player2 Wins
                console.log("Player 2 WINS!");
            }
            else{
                //TIE Game
                console.log("The match resulted in a TIE!");
            }
        }
}

// Play Game
let myGame = new Game();
myGame.dealCards();
myGame.playGame();
myGame.displayResults();
