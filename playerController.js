(function () {

  const players = {
    bindEvents: () => {
      events.on('humanOpponent', players.initHumanOpponent);
    },

    createPlayer: () => {
      return { moves: [],}
    },

    initHumanOpponent: () => {
      players.playerOne = players.createPlayer();
      players.playerTwo = players.createPlayer();
      console.log(players)
    },

  }

  players.bindEvents();
})()