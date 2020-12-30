(function() {

  const display = {

    init: () => {
      display.drawPlayerSelector();
    },

    bindEvents: () => {
      events.on('startGame', display.init);
      events.on('allPlayersCreated', display.createGame)
      events.on('playerMove', display.drawMove);
      events.on('drawWinner', display.drawWinner);
      events.on('addFade', display.addFade);
      events.on('removeOpen', display.removeOpen);
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
          const div = document.getElementById(`A${i}`);
          div.classList.add('gridSquare');
          div.classList.add('open');
        } else if (i > 3 && i <= 6) {
          display.createElement(`B${i - 3}`, gameGrid, 'div');
          const div = document.getElementById(`B${i - 3}`);
          div.classList.add('gridSquare');
          div.classList.add('open');
        } else {
          display.createElement(`C${i - 6}`, gameGrid, 'div');
          const div = document.getElementById(`C${i - 6}`);
          div.classList.add('gridSquare');
          div.classList.add('open');
        }
      }
    },

    drawPlayerSelector: () => {
      display.createElement('gameDisplay', main, 'div');
      display.createElement('playerSelect', gameDisplay, 'p');
      display.createElement('buttonContainer', gameDisplay, 'div');
      playerSelect.textContent = 'select opponent';
      display.createElement('humanButton', buttonContainer, 'button');
      humanButton.textContent = 'human';
      humanButton.classList.add('fill');
      display.createElement('computerButton', buttonContainer, 'button');
      computerButton.textContent = 'computer';
      computerButton.classList.add('fill');
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
        display.drawPlayerInput();
      });
    },

    drawPlayerInput: () => {
      display.createElement('namePrompt', gameDisplay, 'p');
      namePrompt.textContent = 'input player one name';
      display.createElement('nameInput', gameDisplay, 'input');
      nameInput.setAttribute('type', 'text')
      nameInput.placeholder = 'name';
      display.createElement('nameSubmit', gameDisplay, 'button');
      nameSubmit.textContent = 'submit';
      nameSubmit.classList.add('fill');
      display.playerInputEvents();
    },

    playerInputEvents: () => {
      nameSubmit.addEventListener('click', () => {
        events.emit('playerCreated', nameInput.value);
        if (document.getElementById('nameInput')) { 
          nameInput.value = ''; 
          namePrompt.textContent = 'input player two name';
        } else {
          events.emit('playerChosen', 'add');
        }
      })
    },

    createGame: () => {
      display.clearDisplay(gameDisplay);
      display.drawBoard();
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
      display.createElement(`${location}p`, div, 'p'); 
      const p = document.getElementById(`${location}p`);
      p.textContent = `${marker}`;
      div.classList.remove('open');
    },

    addFade: (location) => {
      const div = document.getElementById(location+'p');
      div.classList.add('text-focus-in');
    },

    drawWinner: (name) => {
      const h2 = document.createElement('h2');
      gameDisplay.prepend(h2);
      if (name !== 'tie') {
        h2.textContent = `${name} wins`;
      } else {
        h2.textContent = 'draw'
      }
      display.createElement('reset', gameDisplay, 'button');
      const reset = document.getElementById('reset');
      reset.textContent = 'reset';
      reset.classList.add('fill');
      reset.addEventListener('click', display.resetDisplay);
    },

    resetDisplay: () => {
      display.clearDisplay(main);
      display.drawPlayerSelector();
      events.emit('reset');
    },

    removeOpen: (arr) => {
      arr.forEach(blank => {
        const div = document.getElementById(blank);
        div.classList.remove('open');
      })
    },

  }

  display.bindEvents();

})();