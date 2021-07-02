let condition
let gameWon
let origBoard 
let randomEmpty
let buttonEl = document.querySelector("button")
let hardBtn = document.querySelector('#hard')
let easyBtn = document.querySelector('#easy')
const containerEl = document.querySelector('.container')
const huPlayer = 'X' 
const aiPlayer = "O"
const startSound = new Audio();
startSound.src="/css/src_files/living.mp3"


const winCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
const boardEl = document.querySelector('.board')
const board = document.querySelectorAll('.board > div')

init()

easyBtn.addEventListener("click", function(e){
	e.preventDefault()
	condition = "easy"
	startGame()
	return condition
	})

hardBtn.addEventListener("click", function(e){
	e.preventDefault()
	condition = "hard"
	startGame()
	return condition
	})


//Initialization
function init(){
	containerEl.style.display="block"
	easyBtn.style.display="block"
	hardBtn.style.display="block"
	boardEl.style.display="none"
    document.querySelector('.endGame').style.display ="none"; //hide the end game display
}

//Start the game with empty board and hide the options menu
function startGame(){
	containerEl.style.display="none"
	easy.style.display="none"
	hard.style.display="none"
	boardEl.style.display="flex"
    document.querySelector('.endGame').style.display ="none"; //hide the end game display
    origBoard = Array.from(Array(9).keys())//create a copy of the 
    for(let i=0; i< board.length; i++){
        board[i].innerText = '';
        board[i].style.removeProperty('background-color')
        board[i].style.removeProperty('img')
        board[i].addEventListener('click', turnClick, false)
}
}

//register the position clicked for the user and find the bestspot for the AI
function turnClick(square){
    if(typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, huPlayer)
	}if(!checkWin(origBoard, huPlayer) && !checkTie()){
		randomEmpty = Math.floor(Math.random() * (3-1) + 1)
		turn(bestSpot(), aiPlayer);
    }
	}


//check players turn
function turn(squareId, player){
    origBoard[squareId] = player
    document.getElementById(squareId).innerText = player
    let gameWon = checkWin(origBoard, player)
    if(gameWon){ gameOver(gameWon)}
	else if(origBoard[squareId].innerText = huPlayer){
		document.querySelector(".endGame").style.display = "block";
		document.querySelector(".endGame .text").innerText = "X";
	}else{
		document.querySelector(".endGame").style.display = "block";
		document.querySelector(".endGame .text").innerText = "O";
	}
	return player
}


//check for empty squares
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

//find the best spot function utilizing minmax method
function bestSpot() {
	setTimeout(minimax, 4000)
	if(condition === "easy"){
		return emptySquares()[1] || emptySquares()[randomEmpty]
	}else{
		return minimax(origBoard, aiPlayer).index;
}
}

//Check for a tie
function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < board.length; i++) {
			board[i].style.backgroundColor = "orange";
			board[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		lossSound.src="/css/src_files/wawawa.mp3"
		return true;
	}
	return false;
}

//AI Unbeatable algorithm

function minimax(newBoard, player) {
	let availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			let result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === aiPlayer) {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

//Check for the win case
function checkWin(board, player) {
	let plays = board.reduce((acc, elem, ind) => 
		(elem === player) ? acc.concat(ind) : acc, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

//GameOver when gameWon
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
			
	}
	for (let i = 0; i < board.length; i++) {
		board[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameWon.player == huPlayer ? "You Win!"  : "You Lose.")
}

//render the winner in the box
function declareWinner(who){
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
}




