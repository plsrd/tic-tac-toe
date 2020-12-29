(function () { 
  const bindEvents = () => {
    events.on('allPlayerMoves', checkWinner);
    events.on('reset', () => {winner = undefined});
  }

  const checkWinner = (moves) => {
    let winner;

    moves.forEach(player => {

      let letters = ['A', 'B', 'C'];
    
      for (let i = 0; i < letters.length; i++) {
        if (player.moves.filter(move => move.includes(letters[i])).length === 3){
          return winner = player.id;
        } else if (player.moves.includes(`A${i}`) && player.moves.includes(`B${i}`) && player.moves.includes(`C${i}`)) {
          return winner = player.id;
        } 
      }

      if (player.moves.includes(`A1`) && player.moves.includes(`B2`) && player.moves.includes(`C3`)) {
        return winner = player.id;
      } else if (player.moves.includes(`A3`) && player.moves.includes(`B2`) && player.moves.includes(`C1`)) {
        return winner = player.id;
      }

    });

    if (winner !== undefined) {
      events.emit('drawWinner', winner);
      events.emit('winnerChosen', 'remove');
    }
  }

  bindEvents();
})()