# The Odin Project: Tic Tac Toe

This game was created for The Odin Project's Javascript course. The main focus of this project was to practice using modules and factories to build out an app. I have to admit that after this I'm sort of obsessed with the organization and simple beauty of modules.

The computer player was created using the minimax algorithm, which I was able to recreate using this [youtube video](https://www.youtube.com/watch?v=P2TcQ3h0ipQ) and this [article](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/). Because of this, the best you can hope for against the ai is a draw. As in Wargames, the only winning move is not to play.

---
## Assignment

The original assignment can be found [here](https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript).

- [x] Set up your project with a HTML, CSS and Javascript files and get the Git repo all set up.

- [x] You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
  - Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
- [x] Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with `"X"`s and `"O"`s)
- [x] Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
  - Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
- [x] Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
- [x] Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

### Optional
- [x]  If you’re feeling ambitious create an AI so that a player can play against the computer!

--- 
## Getting Started

This is a web-based vanilla js/html/css game, so simply follow the link [here](https://racheallarimer.github.io/tic-tac-toe/).