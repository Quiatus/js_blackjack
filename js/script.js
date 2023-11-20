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

function redMessage(errNum) {
    let errors = [
        "GAME OVER! No more funds!",
        "You have lost the round!",
        "You do not have enough money!",
        "You must bet at least 1$!",
        "Please enter a number!",
        "You have surrendered!"
    ];

    result.classList.remove('white', 'green');
    result.classList.add('red');

    return document.getElementById('result').textContent = errors[errNum];
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
    let bank = parseInt(document.getElementById('bank').textContent);

    disablePlayBtn();

    document.getElementById('bet').textContent = 0;

    if (bank === 0) {
        redMessage(0);
    } else {
        redMessage(1);
        enableBetButton()
    }
}

// If player wins, the bet is doubled and added to player's bank. Then the player can play again.

function playerWin() {
    let bank = parseInt(document.getElementById('bank').textContent);
    let bet = parseInt(document.getElementById('bet').textContent);

    bank += bet * 2;

    result.classList.remove('red', 'white');
    result.classList.add('green');

    document.getElementById('bet').textContent = 0;
    document.getElementById('result').textContent = 'YOU HAVE WON!';

    disablePlayBtn();
    enableBetButton()

    document.getElementById('bank').textContent = bank;
}



// If player surrenders

function playerSurrenders() {
    let bank = parseInt(document.getElementById('bank').textContent);
    let bet = parseInt(document.getElementById('bet').textContent);

    bank += bet / 2;

    document.getElementById('bet').textContent = 0;

    redMessage(5);
    disablePlayBtn();
    enableBetButton();

    document.getElementById('bank').textContent = bank;
}

// If player and the house tie 

function tie() {
    let bank = parseInt(document.getElementById('bank').textContent);
    let bet = parseInt(document.getElementById('bet').textContent);

    bank += bet;

    result.classList.remove('red', 'green');
    result.classList.add('white');

    document.getElementById('bet').textContent = 0;
    document.getElementById('result').textContent = 'STAND OFF!';

    disablePlayBtn();
    enableBetButton();

    document.getElementById('bank').textContent = bank;
}

// Initial draw of two cards for player and house.

function initDraw() {
    let playHand = document.getElementById('playHand').textContent;
    let houseHand = document.getElementById('houseHand').textContent;

    let totalPlayer = 0;
    let totalHouse = 0;

    for (let index = 0; index < 4; index++) {
        switch (index) {
            case 0: 
                card = drawnCard(totalPlayer);
                totalPlayer += card;
                playHand = card;
                break;
            case 1:
                card = drawnCard(totalPlayer);
                totalPlayer += card;
                playHand = playHand + '-' + card;
                break;
            case 2:
                card = drawnCard(totalHouse);
                totalHouse += card;
                houseHand = card;
                break;
            case 3:
                card = drawnCard(totalHouse);
                totalHouse += card;
                houseHand = houseHand + '-' + card;
                break;
        }
    }

    document.getElementById('playHand').textContent = playHand;
    document.getElementById('playTotal').textContent = totalPlayer;
    document.getElementById('houseHand').textContent = houseHand;
    document.getElementById('houseTotal').textContent = totalHouse;

    if ((totalPlayer === 21) && (totalHouse < 21)) {
        disablePlayBtn();
        setTimeout(() => {houseDraw()}, houseTimer);
    } else if ((totalPlayer === 21) && (totalHouse === 21)) {
        tie();
    }
}

// Place the bet

function placeBet() {
    let betAmnt = parseInt(document.getElementById('betAmnt').value);
    let bank = parseInt(document.getElementById('bank').textContent);

    // Verifying if the input amount is correct

    if ((betAmnt > 0) && (betAmnt <= bank)) {
        bank = bank - betAmnt;
        document.getElementById('bet').textContent = betAmnt;
        document.getElementById('bank').textContent = bank;

        result.classList.remove('red', 'green');
        result.classList.add('white');

        document.getElementById('betAmnt').value = "";
        document.getElementById('result').textContent = 'Draw a card or stand';

        enableBetButton();

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
    let totalPlayer = parseInt(document.getElementById('playTotal').textContent);

    btnSurrender.classList.remove('button');
    btnSurrender.classList.add('buttonDisabled');
    btnSurrender.removeEventListener('click',playerSurrenders);

    card = drawnCard(totalPlayer);
    totalPlayer += card;

    document.getElementById('playHand').textContent = playHand + '-' + card;
    document.getElementById('playTotal').textContent = totalPlayer;

    if (totalPlayer > 21) {
        playerLost();
    } else if (totalPlayer === 21) {
        btnDraw.classList.remove('button');
        btnDraw.classList.add('buttonDisabled');
        btnDraw.removeEventListener('click',playCard);
    }
}

// If player decides to stand (i.e score is less than 21), the house will start drawing cards.

function stand() {
    let houseTotal = parseInt(document.getElementById('houseTotal').textContent);
    let playTotal = parseInt(document.getElementById('playTotal').textContent);

    if (houseTotal > playTotal) {
        playerLost();
    } else {
        disablePlayBtn();
        setTimeout(() => {houseDraw()}, houseTimer);
    }
}

// House draws a card.

function houseDraw() {
    let houseTotal = parseInt(document.getElementById('houseTotal').textContent);
    let playTotal = parseInt(document.getElementById('playTotal').textContent);

    // Adds timer for the house draws to add suspence
    
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

btnBet.addEventListener('click', placeBet);