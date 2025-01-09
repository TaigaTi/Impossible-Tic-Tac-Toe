# Impossible Tic Tac Toe

This is a simple and interactive **Tic Tac Toe** game built with React. It allows two players to play a game of Tic Tac Toe, with one player being controlled by the computer (AI) using the minimax algorithm.

## Try It Yourself:
Live Demo: https://tictactoe-2.onrender.com

<div style="flex-direction: row; justify: spac-between;">
  <img src ="https://github.com/user-attachments/assets/045f3b06-2593-4ba1-92a9-bf0f9316412d" width="210px"/>
  <img src ="https://github.com/user-attachments/assets/aa8f1d1b-44b0-445e-b9d0-fe1fbdb8b960" width="750px"/>
</div>

## Features

- **Player vs. AI**: Play against an AI opponent powered by the minimax algorithm.
- **Game History**: Keep track of the game moves and jump back to any move in the game history.
- **Winning/Draw Detection**: Automatically detects the winner or a draw at the end of the game.
- **Responsive Design**: The game is fully responsive, making it suitable for both mobile and desktop screens.
  
## Technologies Used

- React
- Tailwind
- Minimax Algorithm

## Setup and Installation

1. **Clone the repository**:

```bash
git clone https://github.com/TaigaTi/Impossible-Tic-Tac-Toe
cd Impossible-Tic-Tac-Toe
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the app**:

```bash
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to start playing.

## How to Play

1. The game is played on a 3x3 grid.
2. Player **X** goes first (User), followed by **O** (AI).
3. Click on a square to make a move.
4. The AI uses the minimax algorithm to choose the best move.
5. The game will notify you when there's a winner or if it's a draw.

## Game Logic

- The **minimax** algorithm is used to simulate the best possible move for the AI.
- The game calculates the winner after each move by checking all possible winning combinations (rows, columns, diagonals).
- The game will notify the players when the game ends with a winner or a draw.
