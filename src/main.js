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

	static startGame(amountOfPlayers) {
		// 卓の情報
		let table = {
			"players": [],
			"deck": new Deck()
		}
		// デッキのシャッフル
		table["deck"].sfuffleDeck();
		
		for(let i = 0; i < amountOfPlayers; i++) {
			// プレイヤーの手札
			let playerCard = [];
			// ブラックジャックの手札は2枚
			for(let j = 0; j < 2; j++) {
				playerCard.push(table["deck"].draw());
			}
			table["players"].push(playerCard);
		}

		// プレイヤー全員の手札を返す
		return table["players"];
	}
}

let table1 = Dealer.startGame(7);
console.log(table1);