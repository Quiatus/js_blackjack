const btnBet = document.getElementById('btnBet');
const btnAllIn = document.getElementById('btnAllIn');
const btnDraw = document.getElementById('btnDraw');
const btnStand = document.getElementById('btnStand');
const btnSurrender = document.getElementById('btnSurrender');
const result = document.getElementById('result');
const houseTimer = 1000;

let bank = 100;
let bet = 0;
let houseTotal = 0;
let playTotal = 0;
let currentDeck = [];

let round = 0;
let wins = 0;
let loses = 0;
let standoffs = 0;
let surrenders = 0;

function resetDeck() {
    const deck = [
        {value: 11, face: "🂡"}, {value: 11, face: "🂱"}, {value: 11, face: "🃁"}, {value: 11, face: "🃑"}, 
        {value: 2, face: "🂢"}, {value: 2, face: "🂲"}, {value: 2, face: "🃂"}, {value: 2, face: "🃒"}, 
        {value: 3, face: "🂣"}, {value: 3, face: "🂳"}, {value: 3, face: "🃃"}, {value: 3, face: "🃓"}, 
        {value: 4, face: "🂤"}, {value: 4, face: "🂴"}, {value: 4, face: "🃄"}, {value: 4, face: "🃔"}, 
        {value: 5, face: "🂥"}, {value: 5, face: "🂵"}, {value: 5, face: "🃅"}, {value: 5, face: "🃕"}, 
        {value: 6, face: "🂦"}, {value: 6, face: "🂶"}, {value: 6, face: "🃆"}, {value: 6, face: "🃖"}, 
        {value: 7, face: "🂧"}, {value: 7, face: "🂷"}, {value: 7, face: "🃇"}, {value: 7, face: "🃗"}, 
        {value: 8, face: "🂨"}, {value: 8, face: "🂸"}, {value: 8, face: "🃈"}, {value: 8, face: "🃘"}, 
        {value: 9, face: "🂩"}, {value: 9, face: "🂹"}, {value: 9, face: "🃉"}, {value: 9, face: "🃙"}, 
        {value: 10, face: "🂪"}, {value: 10, face: "🂺"}, {value: 10, face: "🃊"}, {value: 10, face: "🃚"}, 
        {value: 10, face: "🂫"}, {value: 10, face: "🂻"}, {value: 10, face: "🃋"}, {value: 10, face: "🃛"}, 
        {value: 10, face: "🂭"}, {value: 10, face: "🂽"}, {value: 10, face: "🃍"}, {value: 10, face: "🃝"}, 
        {value: 10, face: "🂮"}, {value: 10, face: "🂾"}, {value: 10, face: "🃎"}, {value: 10, face: "🃞"}
    ];

    currentDeck = deck;
}

function playerStats(stat){
    if (stat === 0) {
        round += 1;
        document.getElementById('sRound').textContent = round;
    } else if (stat === 1) {
        wins += 1;
        document.getElementById('sWin').textContent = wins;
    } else if (stat === 2) {
        loses += 1;
        document.getElementById('sLose').textContent = loses;
    } else if (stat === 3) {
        standoffs += 1;
        document.getElementById('sStand').textContent = standoffs;
    } else if (stat === 4) {
        surrenders += 1;
        document.getElementById('sSurrend').textContent = surrenders;
    }
}

// Draw a card with value between 2 - 11 (Ace). If the total is more than 11 and another Ace is drawn, the value of Ace is 1.

function drawCard(player) {
    let card = Math.floor(Math.random() * currentDeck.length);
    let cardValue = currentDeck[card].value;
    let cardFace = currentDeck[card].face;

    currentDeck.splice(card, 1);

    let playHand = document.getElementById('playHand').textContent;
    let houseHand = document.getElementById('houseHand').textContent;

    if (player) {
        if ((playTotal >= 11) && (cardValue === 11)) {
            cardValue = 1;
        }

        playTotal += cardValue;
        playHand += cardFace;

        document.getElementById('playHand').textContent = playHand;
        document.getElementById('playTotal').textContent = playTotal;
    } else {
        if ((houseTotal >= 11) && (cardValue === 11)) {
            cardValue = 1;
        }

        houseTotal += cardValue;
        houseHand += cardFace;

        document.getElementById('houseHand').textContent = houseHand;
        document.getElementById('houseTotal').textContent = houseTotal;
    }
}

// Messages based on players action.

function playMessage(msgNum) {
    let messages = [
        {color: "red", text: "GAME OVER! Not enough funds to play!"},
        {color: "red", text: "You have lost the round!"},
        {color: "red", text: "You do not have enough funds!"},
        {color: "red", text: "You must bet at least 5$!"},
        {color: "red", text: "Please enter a number!"},
        {color: "red", text: "You have surrendered!"},
        {color: "green", text: "YOU HAVE WON!"},
        {color: "white", text: "STAND OFF!"},
        {color: "white", text: "Draw a card or stand!"},
        {color: "white", text: "Dealer's turn!"},];

    result.classList.remove('white', 'green', 'red');
    result.classList.add(messages[msgNum].color);
    result.textContent = messages[msgNum].text;
}

function changeBankText(ban,be){
    document.getElementById('bank').textContent = ban;
    document.getElementById('bet').textContent = be;
}

// Enables or disables player buttons based on the state of game

function disablePlayBtn(btdraw,btstand,btsurrender,btbet) {
    if (btdraw) {
        btnDraw.classList.remove('buttonDisabled');
        btnDraw.classList.add('button');
        btnDraw.addEventListener('click',playCard);
    } else {
        btnDraw.classList.remove('button');
        btnDraw.classList.add('buttonDisabled');
        btnDraw.removeEventListener('click',playCard);
    }
    
    if (btstand) {
        btnStand.classList.remove('buttonDisabled');
        btnStand.classList.add('button');
        btnStand.addEventListener('click',stand);
    } else {
        btnStand.classList.remove('button');
        btnStand.classList.add('buttonDisabled');
        btnStand.removeEventListener('click',stand);
    }

    if (btsurrender) {
        btnSurrender.classList.remove('buttonDisabled');
        btnSurrender.classList.add('button');
        btnSurrender.addEventListener('click',playerSurrenders);
    } else {
        btnSurrender.classList.remove('button');
        btnSurrender.classList.add('buttonDisabled');
        btnSurrender.removeEventListener('click',playerSurrenders);
    }

    if (btbet) {
        btnBet.classList.remove('buttonDisabled');
        btnBet.classList.add('button');
        btnBet.addEventListener('click',placeBet);

        btnAllIn.classList.remove('buttonDisabled');
        btnAllIn.classList.add('button');
        btnAllIn.addEventListener('click',allIn);
    } else {
        btnBet.classList.remove('button');
        btnBet.classList.add('buttonDisabled');
        btnBet.removeEventListener('click',placeBet);

        btnAllIn.classList.remove('button');
        btnAllIn.classList.add('buttonDisabled');
        btnAllIn.removeEventListener('click',allIn);
    }
}

// Checks if player has any funds left and informs accordingly. If so, allows to place a new bet.

function playerLost() {   
    changeBankText(bank,0);
    playerStats(2);

    if (bank < 5) {
        playMessage(0);
        disablePlayBtn(false,false,false,false);
    } else {
        playMessage(1);
        disablePlayBtn(false,false,false,true);
    }
}

// If player wins, the bet is doubled and added to player's bank. Then the player can play again.

function playerWin() {
    bank += bet * 2;

    playerStats(1);
    playMessage(6);
    changeBankText(bank,0);
    disablePlayBtn(false,false,false,true);
}

// If player surrenders

function playerSurrenders() {
    bank += Math.ceil(bet / 2);

    playerStats(4);
    playMessage(5);
    changeBankText(bank,0);
    disablePlayBtn(false,false,false,true);
}

// If player and the house tie 

function tie() {
    bank += bet;

    playerStats(3);
    playMessage(7);
    changeBankText(bank,0);
    disablePlayBtn(false,false,false,true);
}

// Initial draw of two cards for player and house.

function initDraw() {
    document.getElementById('playHand').textContent = "";
    document.getElementById('houseHand').textContent = "";
    playTotal = 0;
    houseTotal = 0;

    playerStats(0);
    resetDeck();
    drawCard(true);
    drawCard(true);
    drawCard(false);
    drawCard(false);

    if ((playTotal === 21) && (houseTotal < 21)) {
        playMessage(9);
        disablePlayBtn(false,false,false,false);
        setTimeout(() => {houseDraw()}, houseTimer);
    } else if ((playTotal === 21) && (houseTotal === 21)) {
        tie();
    }
}

// Verifying if the input amount is correct and place the bet

function placeBet() {
    let betAmnt = parseInt(document.getElementById('betAmnt').value);

        if ((betAmnt >= 5) && (betAmnt <= bank)) {
            document.getElementById('betAmnt').value = "";
            bet = betAmnt;
            bank = bank - bet;
            
            playMessage(8);
            changeBankText(bank,bet);
            disablePlayBtn(true,true,true,false);
            initDraw();
        } else if (betAmnt > bank) {
            playMessage(2);
            document.getElementById('betAmnt').value = bank;
        } else if (betAmnt < 0) {
            document.getElementById('betAmnt').value = 0;
        } else if ((betAmnt >= 0) && (betAmnt < 5)) {
            playMessage(3);
            document.getElementById('betAmnt').value = 5;
        } else {
            playMessage(4);
            document.getElementById('betAmnt').value = "";
        }
}

// All in 

function allIn() {
    bet = bank;
    bank = 0;
            
    playMessage(8);
    changeBankText(bank,bet);
    disablePlayBtn(true,true,true,false);
    initDraw();
}

// Player draws a card. 

function playCard() {
    disablePlayBtn(true,true,false,false);
    drawCard(true);

    if (playTotal > 21) {
        playerLost();
    } else if (playTotal === 21) {
        disablePlayBtn(false,true,false,false);
    }
}

// If player decides to stand (i.e score is less than 21), the house will start drawing cards.

function stand() {
    if (houseTotal > playTotal) {
        playerLost();
    } else {
        disablePlayBtn(false,false,false,false);
        playMessage(9);
        setTimeout(() => {houseDraw()}, houseTimer);
    }
}

// House draws a card. Adds a delay to house draws. As long as the house total is less than players, the house draws a card.

function houseDraw() {
    
    function iter(){
        if (houseTotal <= playTotal) {     
            if ((houseTotal >= 17) && (playTotal === houseTotal)) {
                tie();
            } else {
                setTimeout(iter, houseTimer);
                drawCard(false);

                if ((houseTotal <= 21) && (houseTotal > playTotal)) {
                    playerLost();
                } else if (houseTotal > 21) {
                    playerWin();
                }  
            }
        } 
    }

    iter();
}

// Initiates the game

function gameStart() {
    disablePlayBtn(false,false,false,true);
    changeBankText(bank,'-');
}

gameStart();