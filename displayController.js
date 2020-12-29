(function() {

  const display = {

    init: () => {
      display.drawPlayerSelector();
    },

    bindEvents: () => {
      events.on('startGame', display.init);
      events.on('playerMove', display.drawMove);
      events.on('drawWinner', display.drawWinner);
    },

    createElement: (id, target, type) => {
      const el = document.createElement(type);
      el.setAttribute('id', id);
      target.appendChild(el);
    },

    drawBoard: () => {
      display.createElement('gameGrid', gameDisplay, 'div')
      for (let i = 1; i <= 9; i++) {
        if (i <= 3){
          display.createElement(`A${i}`, gameGrid, 'div');
        } else if (i > 3 && i <= 6) {
          display.createElement(`B${i - 3}`, gameGrid, 'div');
        } else {
          display.createElement(`C${i - 6}`, gameGrid, 'div');
        }
      }
    },

    drawPlayerSelector: () => {
      display.createElement('gameDisplay', main, 'div');
      display.createElement('playerSelect', gameDisplay, 'p');
      playerSelect.textContent = 'select game';
      display.createElement('humanButton', gameDisplay, 'button');
      humanButton.textContent = 'human v human';
      display.createElement('computerButton', gameDisplay, 'button');
      computerButton.textContent = 'human v computer';
      display.playerSelectEvents();
    },

    playerSelectEvents: () => {
      computerButton.addEventListener('click', () => {
        display.clearDisplay(gameDisplay);
        display.drawBoard();
        events.emit('computerOpponent');
        events.emit('playerChosen', 'add');
      });

      humanButton.addEventListener('click', () => {
        display.clearDisplay(gameDisplay);
        display.drawBoard();
        events.emit('humanOpponent');
        events.emit('playerChosen', 'add');
      });
    },

    clearDisplay: (el) => {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    },

    drawMove: (info) => {
      let marker = info[0];
      let location = info.slice(1);
      const div = document.getElementById(location);
      div.textContent = `${marker}`;
    },

    drawWinner: (id) => {
      const h2 = document.createElement('h2');
      gameDisplay.prepend(h2);
      if (id !== 'tie') {
        h2.textContent = `player ${id} wins!`;
      } else {
        h2.textContent = 'TIE!'
      }
      display.createElement('reset', gameDisplay, 'button');
      const reset = document.getElementById('reset');
      reset.textContent = 'reset';
      reset.addEventListener('click', display.resetDisplay);
    },

    resetDisplay: () => {
      display.clearDisplay(main);
      display.drawPlayerSelector();
      events.emit('reset');
    },

  }

  display.bindEvents();

})();