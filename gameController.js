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
      } else {
        events.emit('playerMove', 'O'+move);
      }

      if (moveCount > 4) {
        events.emit('possibleWinner');
      }

      moveCount++;
    }
  }

  bindEvents();

})()