(function() {

    function init() {
      console.log('init');
      this.drawBoard();
    }

    cacheDom =  () => {
      this.main = document.getElementById('main');
    }

    bindEvents = () => {
      events.on('startGame', init);
    }

    createDiv = (id) => {
      console.log('creating div');
      const div = document.createElement('div');
      div.setAttribute('id', id);
      this.main.appendChild(div);
    }

    drawBoard = () => {
      for (let i = 1; i <= 9; i++) {
        if (i <= 3){
          createDiv(`A${i}`);
        } else if (i > 3 && i <= 6) {
          createDiv(`B${i - 3}`);
        } else {
          createDiv(`C${i - 6}`);
        }
      }
    }

  bindEvents();

})();