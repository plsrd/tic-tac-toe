(function () {
  const bindEvents = () => {
  }

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

  const human = 'X';
  const ai = 'O';
  
  const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) =>
		  (e === player) ? a.concat(i) : a, []);
	  let gameWon = null;
	  for (let [index, win] of winCombos.entries()) {
	  	if (win.every(elem => plays.indexOf(elem) > -1)) {
			  gameWon = {index, player};
			  break;
		  }
	  }
	  return gameWon;
  }

  const getMoves = () => {
    return currentBoard.filter(spot => typeof spot == 'number');
  }

  const minimax = (newBoard, player) => {
    let spots = getMoves();

    if (checkWin(newBoard, human)) {
      return { score: -10 }
    } else if (checkWin(newBoard, ai)) {
      return { score: 10 }
    } else if (spots.length === 0) {
      return { score: 0 }
    }

    let moves = [];
    for (let i = 0; i < spots.length; i++) {
      let move = {};
      move.index = newBoard[spots[i]];
      newBoard[spots[i]] = player;

      if (player === ai) {
        let result = minimax(newBoard, human);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, ai);
        move.score = result.score;
      }

      newBoard[spots[i]] = move.index;

      moves.push(move);
    }
    let bestMove;
    if (player === ai) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    events.emit('playerMove', O+moves[bestMove]);
  }

  bindEvents();
})()