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
      moveListeners();
    },

  }
  players.bindEvents();

  let moveCount = 0;

  const moveListeners = () => {
    const grid = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

    grid.forEach(square => {
      const div = document.getElementById(square);
      div.addEventListener('click', (square) => {
        if(div.textContent === ''){
          turnController(square);
        } else { return }
      });
    });
  }

  const turnController = (e) => {
    let move = e.target.id;

    if (moveCount === 0 || moveCount % 2 === 0){
      players.playerOne.moves.push(move);
      events.emit('playerMove', players.playerOne.marker+move);
    } else {
      players.playerTwo.moves.push(move);
      events.emit('playerMove', players.playerTwo.marker+move);
    }

    moveCount++;
  }

})()