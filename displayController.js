(function() {

  const display = {

    init: () => {
      display.drawPlayerSelector();
    },

    bindEvents: () => {
      events.on('startGame', display.init);
      events.on('playerMove', display.drawMove);
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
        events.emit('computerOpponent');
        display.clearDisplay(gameDisplay);
        display.drawBoard();
      });

      humanButton.addEventListener('click', () => {
        display.clearDisplay(gameDisplay);
        display.drawBoard();
        events.emit('humanOpponent');
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
  }

  display.bindEvents();

})();