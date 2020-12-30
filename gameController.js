(function () {

  const bindEvents =  () => {
      events.on('playerChosen', controlMoveListeners);
      events.on('computerOpponent', toggleAI)
      events.on('computerMove', parseAiMove);
      events.on('reset', resetController);
  }

  const controlMoveListeners = (action) => {
    const grid = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    grid.forEach(square => {
      const div = document.getElementById(square);
      if (action == 'add') {
        div.addEventListener('click', turnController);
      } else {
        div.removeEventListener('click', turnController);
      }
    });
  }

  let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8 ];
  let aiOpponent = false;

  const toggleAI = () => {
    aiOpponent = true;
  }

  const conversionTable = {
    'A1': 0, 'A2': 1, 'A3': 2, 
    'B1': 3, 'B2': 4, 'B3': 5, 
    'C1': 6, 'C2': 7, 'C3': 8,
  };

  const checkLegalMove = (location) => {
    const square = document.getElementById(location);
    return square.textContent === ''
  }

  let moveCount = 1;

  const turnController = (e) => {

    let move = e.target.id;

    if(checkLegalMove(move)) {
      if (moveCount === 1 || moveCount % 2 === 1){
        events.emit('playerMove', 'X' + move);
        currentBoard.splice(conversionTable[move], 1, 'X');

        if (aiOpponent && moveCount < 9) {
          events.emit('moveComplete', currentBoard);
        }

        if (moveCount > 4) {
          checkWin(currentBoard, 'X');
        } 
      } else {
        events.emit('playerMove', 'O'+move);
        currentBoard.splice(conversionTable[move], 1, 'O');
        if (moveCount > 4) {
          checkWin(currentBoard, 'O');
        }
      }
      moveCount++;
    }
  }

  const parseAiMove = (index) => {
    currentBoard.splice(index, 1, 'O');
    console.log(currentBoard)
    events.emit('playerMove', 'O'+Object.keys(conversionTable)[index]);
    checkWin(currentBoard, 'O');
    moveCount++;
  }

  const checkWin = (board, player) => {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
      ) {
        if(aiOpponent === true && player === 'O') {
        events.emit('drawWinner', 'computer');
        events.emit('removeOpen', getBlanks(currentBoard));
        } else { 
        events.emit('drawWinner', player);
        }
        controlMoveListeners('remove');
      } else {
        if (moveCount === 9) {
          events.emit('drawWinner', 'tie');
          controlMoveListeners('remove');
        }
      }
  }

  const getBlanks = (board) => {
    let emptyIndexes = board.filter(spot => typeof spot == 'number');
    for (let i = 0; i < emptyIndexes.length; i++){
      emptyIndexes.splice(i, 1, Object.keys(conversionTable)[emptyIndexes[i]]);
    }
    return emptyIndexes;
  }

  const resetController = () => {
    moveCount = 1;
    currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8 ];
    aiOpponent = false;
  }

  bindEvents();

})()