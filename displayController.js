(function() {

  init = () => {
    this.drawBoard();
  }

  cacheDom = () => {
    this.gameDisplay = document.getElementById('gameDisplay');
    this.infoDisplay = document.getElementById('infoDisplay');
    this.gameGrid = document.getElementById('gameGrid');
  }

  bindEvents = () => {
    events.on('startGame', init);
  }
  createDiv = (id, target) => {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    target.appendChild(div);
  }

  drawBoard = () => {
  //create display
    createDiv('gameDisplay', main);
    cacheDom();
    createDiv('infoDisplay', gameDisplay);
    createDiv('gameGrid', gameDisplay)
    cacheDom();
  //append 2 divs to display: info and game board
  //Draw tic-tac-toe grid in game board
    for (let i = 1; i <= 9; i++) {
      if (i <= 3){
        createDiv(`A${i}`, gameGrid);
      } else if (i > 3 && i <= 6) {
        createDiv(`B${i - 3}`, gameGrid);
      } else {
        createDiv(`C${i - 6}`, gameGrid);
      }
    }
  }

  bindEvents();

})();