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

  let moveCount = 0;

  const controlMoveListeners = (action) => {
    const grid = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

    grid.forEach(square => {
      const div = document.getElementById(square);
      if (action === 'add') {
        div.addEventListener('click', (square) => {turnController(square)});
      } else {
        //div.removeEventListener('click');
      }
    });
  }

  const checkLegalMove = (location) => {
    const square = document.getElementById(location);
    return square.textContent === ''
  }

  const turnController = (e) => {

    let move = e.target.id;

    if(checkLegalMove(move)) {
      if (moveCount === 0 || moveCount % 2 === 0){
        players.playerOne.moves.push(move);
        events.emit('playerMove', players.playerOne.marker+move);
      } else {
        players.playerTwo.moves.push(move);
        events.emit('playerMove', players.playerTwo.marker+move);
      }

      if (moveCount >= 4) {
        checkWinner();
      }

      moveCount++;
    }
  }

  const checkWinner = () => {
    let allPlayers = [players.playerOne, players.playerTwo];
    
    allPlayers.forEach(player => {

      let letters = ['A', 'B', 'C'];
    
      for (let i = 0; i < letters.length; i++) {
        if (player.moves.filter(move => move.includes(letters[i])).length === 3){
          console.log(allPlayers.indexOf(player) + 1 + ' wins');
        } else if (player.moves.includes(`A${i}`) && player.moves.includes(`B${i}`) && player.moves.includes(`C${i}`)) {
          console.log(allPlayers.indexOf(player) + 1 + ' wins');
        } 
      }

      if (player.moves.includes(`A1`) && player.moves.includes(`B2`) && player.moves.includes(`C3`)) {
        console.log(allPlayers.indexOf(player) + 1 + ' wins');
      } else if (player.moves.includes(`A3`) && player.moves.includes(`B2`) && player.moves.includes(`C1`)) {
        console.log(allPlayers.indexOf(player) + 1 + ' wins');
      }

    });

  }

})()