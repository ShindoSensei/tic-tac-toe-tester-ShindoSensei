document.addEventListener('DOMContentLoaded', function () {
  function TTT () {
    // Declaring game variables
    var grid = []
    var player = 1
    var playerOneMoves = []
    var playerTwoMoves = []
    var victoryMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  // playTurn switches players,occupies grid selected and returns true/false
    function playTurn (index) {
      if (isGameOver()) {
        return false
      } else {
        if (grid.includes(index)) {
          return false
        } else {
          grid.push(index)
          if (player === 1) {   // Why need to do ticTacToe.player but   //not ticTacToe.playerOneMoves ? In gitbook closures no need to for cash example
            playerOneMoves.push(index)
            player = 2  // Why tic...player?
            return true
          } else {
            playerTwoMoves.push(index)
            player = 1  // Why tic...player?
            return true
          }
        }
      }
    }

    function getPlayer () {
      return player
    }

    function getGrid () {
      return grid
    }

    function getOneMoves () {
      return playerOneMoves
    }

    function getTwoMoves () {
      return playerTwoMoves
    }

    function getVictoryMoves () {
      return victoryMoves
    }

    function isGameOver () {
      if (whoWon() === 1 || whoWon() === 2 || whoWon() === 3) {
        return true
      } else {
        return false
      }
    }
    // whoWon() returns 0 if game still ongoing,1 if player 1 wins,
    // 2 if player 2 wins & 3 if draw
    function whoWon () {
    // Test player 1 if win
      var oneHitCount = 0
      for (var i = 0; i < victoryMoves.length; i++) {
        for (var j = 0; j < playerOneMoves.length; j++) {
          if (victoryMoves[i].includes(playerOneMoves[j])) {
            oneHitCount++
          }
        }
        if (oneHitCount === 3) {
          return 1 // Mousetrap here -> playerOne wins
        } else {
          oneHitCount = 0
        }
      }
    // Test player 2 if win
      var twoHitCount = 0
      for (var k = 0; k < victoryMoves.length; k++) {
        for (var l = 0; l < playerTwoMoves.length; l++) {
          if (victoryMoves[k].includes(playerTwoMoves[l])) {
            twoHitCount++
          }
        }
        if (twoHitCount === 3) {
          return 2 // Mousetrap here -> playerTwo wins
        } else {
          twoHitCount = 0
        }
      }

      if (grid.length < 9) { // Game not over
        return 0
      } else { // draw case
        return 3
      }
    }

    function restart () {
    // Clearing the variable arrays
      grid = []
      player = 1
      playerOneMoves = []
      playerTwoMoves = []
    // Clearing the DOM Manipulations
      var boxes = document.querySelectorAll('.container > div')
      boxes.forEach(function (elm) {
        elm.textContent = ''
        elm.className = ''
      })
      turnDisplay.textContent = "Player 1's turn "
      winnerDisplay.textContent = ''
    }

    return {
      getGrid: getGrid,
      getPlayer: getPlayer,
      getOneMoves: getOneMoves,
      getTwoMoves: getTwoMoves,
      getVictoryMoves: getVictoryMoves,
      playTurn: playTurn,
      whoWon: whoWon,
      isGameOver: isGameOver,
      restart: restart
    }
  }
  // Assigning namespaced function to variable
  var ticTacToe = TTT()
  // Javascript DOM Manipulation
  var $boxes = $('.container>div')
  // var boxes = document.querySelectorAll('.container>div')
  var restartButt = document.querySelector('button')
  var turnDisplay = document.querySelector('h2')
  var winnerDisplay = document.querySelector('h3')

  // Adding event listener to tic-tac-toe boxes
  $boxes.on('click', function () {
    if (ticTacToe.playTurn($(this).data('num'))) {  // playTurn not switching players?
      $(this).addClass('markedBox')
      if (ticTacToe.getPlayer() === 1) {
        $(this).text('X')
        turnDisplay.textContent = "Player 1's turn"
      } else {
        $(this).text('O')
        turnDisplay.textContent = "Player 2's turn"
      }
    }
    if (ticTacToe.whoWon() === 0) {
      winnerDisplay.textContent = 'Not Over!'
    } else if (ticTacToe.whoWon() === 1) {
      winnerDisplay.textContent = 'Player 1 has won!'
      turnDisplay.textContent = ''
    } else if (ticTacToe.whoWon() === 2) {
      winnerDisplay.textContent = 'Player 2 has won!'
      turnDisplay.textContent = ''
    } else if (ticTacToe.whoWon() === 3) {
      winnerDisplay.textContent = 'Draw!'
      turnDisplay.textContent = ''
    }
  })
  // Adding 'click' event listener to restart button
  restartButt.addEventListener('click', ticTacToe.restart)
})
