const btnBet = document.getElementById('btnBet');
const btnDraw = document.getElementById('btnDraw');
const btnStand = document.getElementById('btnStand');
const btnSurrender = document.getElementById('btnSurrender');
const result = document.getElementById('result');

const houseTimer = 1000;

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
    {value: 10, face: "🂬"}, {value: 10, face: "🂼"}, {value: 10, face: "🃌"}, {value: 10, face: "🃜"}, 
    {value: 10, face: "🂭"}, {value: 10, face: "🂽"}, {value: 10, face: "🃍"}, {value: 10, face: "🃝"}, 
    {value: 10, face: "🂮"}, {value: 10, face: "🂾"}, {value: 10, face: "🃎"}, {value: 10, face: "🃞"}
];

let bank = 100;
let bet = 0;
let houseTotal = 0;
let playTotal = 0;

// Draw a card with value between 2 - 11 (Ace). If the total is more than 11 and another Ace is drawn, the value of Ace is 1.

function drawnCard(total) {
    let drawnCard = Math.floor(Math.random() * (12 - 2) + 2);

    if ((total >= 11) && (drawnCard === 11)) {
        return 1;
    } else {
        return drawnCard;
    }
}

// Error messages based on players action.

function redMessage(msgNum) {
    let messages = [
        "GAME OVER! No more funds!",        
        "You have lost the round!",         
        "You do not have enough money!",
        "You must bet at least 1$!",
        "Please enter a number!",
        "You have surrendered!",
        "YOU HAVE WON!",
        "STAND OFF!",
        "Draw a card or stand!" 
    ];

    result.classList.remove('white', 'green', 'red');

    if (msgNum < 6) {
        result.classList.add('red');
    } else if (msgNum === 6) {
        result.classList.add('green');
    } else if (msgNum > 6) {
        result.classList.add('white');
    }

    return document.getElementById('result').textContent = messages[msgNum];
}

function changeBankText(ban,be){
    document.getElementById('bank').textContent = ban;
    document.getElementById('bet').textContent = be;
}

// Disables Draw and Stand buttons

function disablePlayBtn() {
    btnDraw.classList.remove('button');
    btnDraw.classList.add('buttonDisabled');
    btnDraw.removeEventListener('click',playCard);

    btnStand.classList.remove('button');
    btnStand.classList.add('buttonDisabled');
    btnStand.removeEventListener('click',stand);

    btnSurrender.classList.remove('button');
    btnSurrender.classList.add('buttonDisabled');
    btnSurrender.removeEventListener('click',playerSurrenders);
}

function enableBetButton(){
    btnBet.classList.remove('buttonDisabled');
    btnBet.classList.add('button');
    btnBet.addEventListener('click',placeBet);
}

// Checks if player has any funds left and informs accordingly. If so, allows to place a new bet.

function playerLost() {   
    disablePlayBtn();
    changeBankText(bank,0);

    if (bank === 0) {
        redMessage(0);
    } else {
        redMessage(1);
        enableBetButton();
    }
}

// If player wins, the bet is doubled and added to player's bank. Then the player can play again.

function playerWin() {
    bank += bet * 2;

    redMessage(6);
    changeBankText(bank,0);
    disablePlayBtn();
    enableBetButton()
}

// If player surrenders

function playerSurrenders() {
    bank += bet / 2;

    changeBankText(bank,0);
    redMessage(5);
    disablePlayBtn();
    enableBetButton();
}

// If player and the house tie 

function tie() {
    bank += bet;

    redMessage(7);
    changeBankText(bank,0);
    disablePlayBtn();
    enableBetButton();
}

// Initial draw of two cards for player and house.

function initDraw() {
    let playHand = document.getElementById('playHand').textContent;
    let houseHand = document.getElementById('houseHand').textContent;

    playTotal = 0;
    houseTotal = 0;

    for (let index = 0; index < 4; index++) {
        switch (index) {
            case 0: 
                card = drawnCard(playTotal);
                playTotal += card;
                playHand = card;
                break;
            case 1:
                card = drawnCard(playTotal);
                playTotal += card;
                playHand = playHand + '-' + card;
                break;
            case 2:
                card = drawnCard(houseTotal);
                houseTotal += card;
                houseHand = card;
                break;
            case 3:
                card = drawnCard(houseTotal);
                houseTotal += card;
                houseHand = houseHand + '-' + card;
                break;
        }
    }

    document.getElementById('playHand').textContent = playHand;
    document.getElementById('houseHand').textContent = houseHand;
    document.getElementById('houseTotal').textContent = houseTotal;
    document.getElementById('playTotal').textContent = playTotal;

    if ((playTotal === 21) && (houseTotal < 21)) {
        disablePlayBtn();
        setTimeout(() => {houseDraw()}, houseTimer);
    } else if ((playTotal === 21) && (houseTotal === 21)) {
        tie();
    }
}

// Place the bet

function placeBet() {
    let betAmnt = parseInt(document.getElementById('betAmnt').value);

    // Verifying if the input amount is correct

    if ((betAmnt > 0) && (betAmnt <= bank)) {
        bet = betAmnt;
        document.getElementById('betAmnt').value = "";

        bank = bank - bet;
        
        changeBankText(bank,bet);
        redMessage(8);

        btnBet.classList.remove('button');
        btnBet.classList.add('buttonDisabled');
        btnBet.removeEventListener('click',placeBet);

        btnDraw.classList.remove('buttonDisabled');
        btnDraw.classList.add('button');
        btnDraw.addEventListener('click',playCard);

        btnStand.classList.remove('buttonDisabled');
        btnStand.classList.add('button');
        btnStand.addEventListener('click',stand);

        btnSurrender.classList.remove('buttonDisabled');
        btnSurrender.classList.add('button');
        btnSurrender.addEventListener('click',playerSurrenders);

        initDraw();

    } else if (betAmnt > bank) {
        redMessage(2);
        document.getElementById('betAmnt').value = bank;
    } else if (betAmnt < 0) {
        document.getElementById('betAmnt').value = 0;
    } else if (betAmnt === 0) {
        redMessage(3);
    } else {
        redMessage(4);
        document.getElementById('betAmnt').value = "";
    }
}

// Player draws a card. 

function playCard() {
    let playHand = document.getElementById('playHand').textContent;

    btnSurrender.classList.remove('button');
    btnSurrender.classList.add('buttonDisabled');
    btnSurrender.removeEventListener('click',playerSurrenders);

    card = drawnCard(playTotal);
    playTotal += card;

    document.getElementById('playHand').textContent = playHand + '-' + card;
    document.getElementById('playTotal').textContent = playTotal;

    if (playTotal > 21) {
        playerLost();
    } else if (playTotal === 21) {
        btnDraw.classList.remove('button');
        btnDraw.classList.add('buttonDisabled');
        btnDraw.removeEventListener('click',playCard);
    }
}

// If player decides to stand (i.e score is less than 21), the house will start drawing cards.

function stand() {
    if (houseTotal > playTotal) {
        playerLost();
    } else {
        disablePlayBtn();
        setTimeout(() => {houseDraw()}, houseTimer);
    }
}

// House draws a card.

function houseDraw() {
    function iter(){
        if (houseTotal <= playTotal) {
            
            if ((houseTotal === 21) && (playTotal === 21)) {
                tie();
            } else {
                setTimeout(iter, houseTimer);

                let houseHand = document.getElementById('houseHand').textContent;
                let card = drawnCard(houseTotal);
                houseTotal += card;
        
                document.getElementById('houseHand').textContent = houseHand + '-' + card;
                document.getElementById('houseTotal').textContent = houseTotal;
        
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

function gameStart() {
    btnBet.addEventListener('click', placeBet);
    changeBankText(bank,'-');
}

gameStart();