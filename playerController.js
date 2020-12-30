(function () {

  const players = {
    bindEvents: () => {
      events.on('playerCreated', players.createPlayer);
      events.on('sendWinner', players.sendWinner);
      events.on('reset', players.reset);
    },

    playerCount: 0,

    reset: () => {
      delete players.playerOne;
      delete players.playerTwo;
      players.playerCount = 0;
    },

    createPlayer: (data) => {
      if (players.playerCount === 0) {
        players.playerOne = players.playerFactory(data);
        players.playerCount++;
      } else {
        players.playerTwo = players.playerFactory(data);
        events.emit('allPlayersCreated');
      }
    },

    playerFactory: (name) => {
      return { 
        name
      }
    },

    sendWinner: (player) => {
      if(player === 1) {
        events.emit('drawWinner', players.playerOne.name);
      } else {
        events.emit('drawWinner', players.playerTwo.name);
      }
    },
  }

  players.bindEvents();
})()