# tic-tac-toe
#Tic-Tac-Toe vs AI
#player begins game by choosing an AI opponent (easy or hard)
#when the selection is clicked the condition is saved in memory and the game begins
#the human player goes first
#winCombos array has all of the possible win scenarios of tictactoe
#on easy mode the AI will search through the available empty spots and make their
#move based on predetermined intervals (randumEmpty between 3 and 1, or the second open box 
#emptySquares() function returns a new array of squares that do not contain a letter
#checkTie() function checks to see if the emptySquares function returned 0 and turns the board orange
#bestSpot() on hard does 5 things:
#1. return a value if a terminal state is found (+10,0,-10)
#2. go through available spots on the board
#3. call the minimax function on each available spot
#4. evaluate returning values from function calls
#5. returns the best value
#minimax() logic:
#1. creates list of empty spots found
#2. check for terminal state
#3. change the newBoard by changing aiPlayer in the first empty spot
#4. while the first call is running the second makes a list of two empty spots
#5. repeats steps 1-3 to check for huPlayers next best move
#6. wash and repeat by adding more empty spots until defeat
#
#checkWin() utilizes reduce method to iterate through board and pulls every
#index the player has played in.It then compares all of the elements in winCombos to see if 
#the player has won. gameWon is then assigned to an object with the index of the winCombos
#and the player that won
#gameOver() sets the div styles for who won the game (ie highlighted winning combination and setting
#the inner text for declareWinner()
#
#
