class Card {
	constructor(suit, value, intValue) {
		this.suit = suit;
		this.value = value;
		this.intValue = intValue;
	}
	// インスタンス化されたカード情報の取得 
	getCardString() {
		return this.suit + this.value + "(" + this.intValue + ")";
	}
}

class Deck {
	constructor() {
		this.deck = Deck.generateDeck();
	}
	static generateDeck() {
		let newDeck = [];
		const suits = ["♣", "♦", "♥", "♠"];
		const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

		for(let i = 0; i < suits.length; i++) {
			for(let j = 0; j < values.length; j++) newDeck.push(new Card(suits[i], values[j], j + 1))
		}

		return newDeck;
	}

	draw() {
		return this.deck.pop();
	}

	printDeck() {
		console.log("Display cards...");
		for(let i = 0; i < this.deck.length; i++) {
			console.log(this.deck[i].getCardString());
		}
	}
	// デッキのシャッフル
	sfuffleDeck() {
		let deckSize = this.deck.length;
		for(let i = deckSize - 1; i >= 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = this.deck[i];
			this.deck[i] = this.deck[j];
			this.deck[j] = temp;
		}
	}
}

// ディーラー
class Dealer {

	static startGame(amountOfPlayers, gameMode) {
		// 卓の情報
		let table = {
			"players": [],
			"gameMode": gameMode,
			"deck": new Deck()
		}
		// デッキのシャッフル
		table["deck"].sfuffleDeck();
		
		for(let i = 0; i < amountOfPlayers; i++) {
			// プレイヤーの手札
			let playerCard = [];
			for(let j = 0; j < Dealer.initialCards(gameMode); j++) {
				playerCard.push(table["deck"].draw());
			}
			table["players"].push(playerCard);
		}
		return table;
	}

	static initialCards(gameMode) {
		if(gameMode == "poker") return 5;
		if(gameMode == "21") return 2;
	}

	static printTableInformation(table) {
		console.log("Amount of players: " + table["players"].length + "...Game mode: " + table["gameMode"] + ". At this table: ");

		for(let i = 0; i < table["players"].length; i++) {
			console.log("Player " + (i + 1) + " hand is: ");
			for(let j = 0; j < table["players"][i].length; j++) {
				console.log(table["players"][i][j].getCardString());
			}
		}
	}

	// ブラックジャックは合計値が21を超えた時点で負け
	static score21Individual(cards) {
		let value = 0;
		for(let i = 0; i < cards.length; i++) {
			value += cards[i].intValue;
		}
		if(value > 21) value = 0;
		return value;
	}
}

let table1 = Dealer.startGame(7, "21");
// console.log(table1["players"][0]);
console.log(Dealer.score21Individual(table1["players"][0]));
// Dealer.printTableInformation(table1);

let table2 = Dealer.startGame(5, "poker");
// Dealer.printTableInformation(table2);