(function () {

  const players = {
    bindEvents: () => {
      players.init();
      events.on('humanOpponent', players.initHumanOpponent);
      events.on('playerMove', players.addMove);
      events.on('possibleWinner', players.sendMoves);
      events.on('reset', players.reset);
    },

    init: () => {
      players.playerOne = players.createPlayer(1, 'X');
    },

    reset: () => {
      players.playerOne.moves = [];
      delete players.playerTwo;
    },

    createPlayer: (id, marker) => {
      return { 
        id,
        moves: [],
        marker,
      }
    },

    initHumanOpponent: () => {
      players.playerTwo = players.createPlayer(2, 'O');
      console.log('creating humans:' + players.playerOne.marker + players.playerTwo.marker);
    },

    addMove: (info) => {
      let marker = info[0];
      let location = info.slice(1);

      if (marker === 'X') {
        players.playerOne.moves.push(location);
      } else {
        players.playerTwo.moves.push(location);
      }
    },

    sendMoves: () => {
      events.emit('allPlayerMoves', [players.playerOne, players.playerTwo])
    },

  }

  players.bindEvents();
})()