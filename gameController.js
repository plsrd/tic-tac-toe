(function () {

  const bindEvents =  () => {
      events.on('playerChosen', controlMoveListeners);
      events.on('winnerChosen', controlMoveListeners);
      events.on('reset', () => {moveCount = 1});
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

  let currentBoard= [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const conversionTable = {
    'A1': 0, 'A2': 1, 'A3': 2, 
    'B1': 3, 'B2': 4, 'B3': 5, 
    'C1': 6, 'C2': 7, 'C3': 8,
  };

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  const checkLegalMove = (location) => {
    const square = document.getElementById(location);
    return square.textContent === ''
  }

  let moveCount = 1;

  const turnController = (e) => {

    let move = e.target.id;

    if(checkLegalMove(move)) {
      if (moveCount === 1 || moveCount % 2 === 1){
        events.emit('playerMove', 'X'+move);
        currentBoard.splice(conversionTable[move], 1, 'X');
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

  const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) =>
		  (e === player) ? a.concat(i) : a, []);
	  let winner = null;
	  for (let [index, win] of winCombos.entries()) {
	  	if (win.every(elem => plays.indexOf(elem) > -1)) {
			  winner = player;
			  break;
		  }
    }
    
    if (winner !== null) {
      events.emit('drawWinner', winner);
    }
  }

  bindEvents();

})()