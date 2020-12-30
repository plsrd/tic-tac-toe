(function () {
  const bindEvents = () => {
    events.on('moveComplete', updateCurrentBoard);
  }

  let currentBoard;

  const human = 'X';
  const ai = 'O';

  const updateCurrentBoard = (data) => {
    currentBoard = data;
    aiMove();
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
      return true;
      } else {
      return false;
      }
     }

  const getMoves = (board) => {
    return board.filter(spot => typeof spot == 'number');
  }

  const aiMove = () => {
    events.emit('computerMove', minimax(currentBoard, ai).index);
  }

  const minimax = (newBoard, player) => {
    let spots = getMoves(newBoard);

    if (checkWin(newBoard, human)) {
      return {score: -10};
    } else if (checkWin(newBoard, ai)) {
      return {score: 10};
    } else if (spots.length === 0) {
      return {score: 0};
    }

    let moves = [];
    for (let i = 0; i < spots.length; i++) {
      let move = {};
      move.index = newBoard[spots[i]];
      newBoard[spots[i]] = player;

      if (player == ai) {
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
    if(player === ai) {
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

  bindEvents();
})()