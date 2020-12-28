(function () {

  const players = {
    bindEvents: () => {
      events.on('humanOpponent', players.initHumanOpponent);
    },

    humanPlayer: (marker) => {
      return { 
        moves: [],
        marker,
      }
    },

    initHumanOpponent: () => {
      players.playerOne = players.humanPlayer('X');
      players.playerTwo = players.humanPlayer('O');
      controlMoveListeners('add');
    },

  }
  players.bindEvents();

  const controlMoveListeners = (action) => {
    const grid = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

    grid.forEach(square => {
      const div = document.getElementById(square);
      if (action === 'add') {
        div.addEventListener('click', turnController);
      } else {
        div.removeEventListener('click', turnController);
      }
    });
  }

  const checkLegalMove = (location) => {
    const square = document.getElementById(location);
    return square.textContent === ''
  }

  let moveCount = 1;

  const turnController = (e) => {

    let move = e.target.id;

    if(checkLegalMove(move)) {
      if (moveCount === 1 || moveCount % 2 === 1){
        players.playerOne.moves.push(move);
        events.emit('playerMove', players.playerOne.marker+move);
      } else {
        players.playerTwo.moves.push(move);
        events.emit('playerMove', players.playerTwo.marker+move);
      }

      if (moveCount >= 4) {
        checkWinner();
      }
      console.log(players.playerOne.moves + ':' + players.playerTwo.moves + ':' + moveCount);
      moveCount++;
    }
  }

  const checkWinner = () => {
    let allPlayers = [players.playerOne, players.playerTwo];
    
    allPlayers.forEach(player => {

      let letters = ['A', 'B', 'C'];
      let winner;
    
      for (let i = 0; i < letters.length; i++) {
        if (player.moves.filter(move => move.includes(letters[i])).length === 3){
          winner = player;
        } else if (player.moves.includes(`A${i}`) && player.moves.includes(`B${i}`) && player.moves.includes(`C${i}`)) {
          winner = player;
        } 
      }

      if (player.moves.includes(`A1`) && player.moves.includes(`B2`) && player.moves.includes(`C3`)) {
        winner = player;
      } else if (player.moves.includes(`A3`) && player.moves.includes(`B2`) && player.moves.includes(`C1`)) {
        winner = player;
      }

      if (winner !== undefined) {
        events.emit('playerWins', winner.marker);
        controlMoveListeners('remove');
        moveCount = 0;
      }
    });
  }

})()