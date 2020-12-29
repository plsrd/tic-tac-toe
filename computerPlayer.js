(function () {
  const bindEvents = () => {
    events.on('computerOpponent', initComputerOpponent);
    events.on('moveComplete', setAvailMoves);
  }

  let availMoves;

  const setAvailMoves = (moves) => {
    availMoves = moves;
    console.log(availMoves);
  }

  const initComputerOpponent = () => {
    console.log('creating robots')
    return {
      id: 2,
      marker: 'O',
      moves: [],
    }
  }

  const minimax = (newBoard, player) => {

  }

  bindEvents();
})()