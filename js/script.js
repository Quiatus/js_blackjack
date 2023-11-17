let playerBank = 100;

function drawnCard() {
    return Math.floor(Math.random() * (11 - 2) + 2);
}

function initDraw() {
    let playHand = document.getElementById('playHand').textContent;
    let houseHand = document.getElementById('houseHand').textContent;

    let totalPlayer = 0;
    let totalHouse = 0;

    for (let index = 0; index < 2; index++) {
        card = drawnCard();
        totalPlayer += card;

        if (index == 0) {
            playHand = card;
        } else {
            playHand = playHand + ' - ' + card;
        }
    }

    for (let index = 0; index < 2; index++) {
        card = drawnCard();
        totalHouse += card;

        if (index == 0) {
            houseHand = card;
        } else {
            houseHand = houseHand + ' - ' + card;
        }
    }

    document.getElementById('playHand').textContent = playHand;
    document.getElementById('playTotal').textContent = totalPlayer;

    document.getElementById('houseHand').textContent = houseHand;
    document.getElementById('houseTotal').textContent = totalHouse;
}

function placeBet() {
    let betAmnt = parseInt(document.getElementById('betAmnt').value);
    let bank = parseInt(document.getElementById('bank').textContent);
    let result = document.getElementById('result');
    let btnBet = document.getElementById('btnBet');

    if ((betAmnt > 0) && (betAmnt <= bank)) {
        playerBank = playerBank - betAmnt;
        document.getElementById('bet').textContent = betAmnt;
        document.getElementById('bank').textContent = playerBank;

        result.classList.remove('red');
        result.classList.add('white');

        document.getElementById('betAmnt').value = 0;
        document.getElementById('result').textContent = 'You bet ' + betAmnt + '!';

        btnBet.classList.remove('button');
        btnBet.classList.add('buttonDisabled');
        btnBet.removeEventListener('click',placeBet);

        initDraw();
    } else if (betAmnt > bank) {
        result.classList.add('red');
        document.getElementById('result').textContent = 'You do not have enough money!';
        document.getElementById('betAmnt').value = bank;
    } else if (betAmnt < 0) {
        document.getElementById('betAmnt').value = 0;
    } else if (betAmnt === 0) {
        result.classList.add('red');
        document.getElementById('result').textContent = 'You must bet at least 1!';
    } else {
        result.classList.add('red');
        document.getElementById('result').textContent = 'Please enter a number!';
        document.getElementById('betAmnt').value = 0;
    }
}

btnBet.addEventListener('click', placeBet);