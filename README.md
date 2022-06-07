# Tic Tac Toe
A project from [The Odin Project Curriculum](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe).

**[PLAY IT!](https://astating.github.io/Tic-Tac-Toe-JS/)**<br><br>

<details><summary><u>ASSIGNMENT</u></summary>
<ol> <li> Set up your project with a HTML, CSS and Javascript files and get the Git repo all set up.
<li>You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

<ol><li>Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories. 
</ol><li>Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s) 
<li>Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken! 
<ol><li>Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later! 
</ol><li>Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie. 
<li>Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player! 
<li>Optional - If you’re feeling ambitious create an AI so that a player can play against the computer! 
<ol><li>Start by just getting the computer to make a random legal move. 
<li>Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one) 
<li>If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!</ol>
</details>
<br><hr><br>


I advanced a bit slowly on this project as it took time and I had many projects to complete at school.

One day, I thought let's do quick and dirty (and complex and procedural and antipattern and trampling on OOP), I'll fix it later.

Now getting back to it three months later, I never fixed it.

It's working as intended though, with some level of finition.

But the code is my worst spaghetti hell so far. That's not an understatement, and if there are modules and factory functions on paper... they're disfigured beyond recognition.

Harsh but true. I'm posting it as is and moving on.

That would be a good training in refactoring for later, if I ever get to work at it again. What's sure, though, is that I'll learn from my mistakes for the NEXT project, and try to apply some of what I've learned in between, heeding in particular to Sandi Metz's warnings and tips in her book *Practical Object-Oriented Design: An Agile Primer Using Ruby* (aka *POODR*).