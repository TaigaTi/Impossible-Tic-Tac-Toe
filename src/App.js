import { useState } from "react";
import Square from "./Square";

// Helper function to calculate winner
function calculateWinner(squares) {
  let winner = null;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a draw
  let occupied = 0;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] != null) {
      occupied++;
    }
  }

  if (occupied >= squares.length) {
    winner = [-1, -1, -1];
  }

  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = [a, b, c];
    }
  }

  return winner;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const squares = history[currentMove];

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Game Start";
    }

    return (
      <li key={move} className="w-full md:px-10">
        <div className="move-container w-full px-5">
          <button className="move-button w-full" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </div>
      </li>
    );
  });

  // Handle Gameplay and History Update
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jump to A Move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Handle Square Click
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = "X"
    handlePlay(nextSquares)

    if (calculateWinner(nextSquares)) return

    setTimeout(() => {
      setHistory((prevHistory) => {
        const currentSquares = prevHistory[prevHistory.length - 1]
        const aiSquares = [...currentSquares]
        const aiMove = bestMove(aiSquares)

        if (aiMove != null) {
          aiSquares[aiMove] = "O"
          return [...prevHistory, aiSquares]
        }

        return prevHistory
      })
      
      setCurrentMove((prevMove) => prevMove + 1)
    }, 200)
  }

  // Print Game Status
  const winner = calculateWinner(squares)

  let status;

  if (winner) {
    if (winner[0] === -1) {
      status = "Winner: Draw";
    } else {
      status = "Winner: " + squares[winner[1]];
    }
  } else {
    status = "Next Player: " + (currentMove % 2 == 0 ? "X" : "O");
  }

  // Check For Winning Squares
  function isWinningSquare(index) {
    return winner && winner != [-1, -1, -1] && winner.includes(index);
  }

  function isDraw() {
    return winner && winner[0] == -1;
  }

  // Minimax
  function minimax(tempSquares, isMaximizing, depth) {
    // Return the value function if gameover
    const winner = calculateWinner(tempSquares)
    if (winner && winner[0] == -1) return 0 + depth
    if (winner && tempSquares[winner[0]] == "X") return -10 + depth
    if (winner && tempSquares[winner[0]] == "O") return 10 - depth

    // Maximizing Player
    if (isMaximizing) {
      let maxVal = -Infinity

      // Check all possible moves
      for (let i = 0; i < tempSquares.length; i++) {
        if (tempSquares[i] == null) {
          tempSquares[i] = "O"

          let evaluation = minimax(tempSquares, false, depth + 1)

          tempSquares[i] = null
          maxVal = Math.max(maxVal, evaluation)
        }
      }

      return maxVal
    }

    // Minimizing Player
    else {
      let minVal = Infinity

      // Check all possible moves
      for (let i = 0; i < tempSquares.length; i++) {
        if (tempSquares[i] == null) {
          tempSquares[i] = "X"

          let evaluation = minimax(tempSquares, true, depth + 1)

          tempSquares[i] = null
          minVal = Math.min(minVal, evaluation)
        }
      }

      return minVal
    }
  }

  function bestMove(tempSquares) {
    let bestScore = -Infinity
    let move = null

    for (let i = 0; i < tempSquares.length; i++) {
      if (tempSquares[i] == null) {
        tempSquares[i] = "O"

        let score = minimax(tempSquares, false, 0)
        tempSquares[i] = null

        if (score > bestScore)
          bestScore = score
        move = i
      }
    }

    return move
  }

  return (
    <>
      <div className="title flex items-center justify-center p-3 pb-0 w-full">
        <h1 className="text-5xl">Tic Tac Toe</h1>
      </div>
      <div className="game grid grid-cols-1 md:grid-cols-3 justify-center text-center md:px-10 w-full">
        <div className="p-10 order-last md:order-first md:col-span-1 h-full">
          <div className="game-info h-full flex flex-col items-center">
            <h1 className="py-3">Game History</h1>
            <ol className="flex flex-col flex-start items-start pt-2 gap-3 w-full h-full">{moves}</ol>
          </div>
          <p className="pt-2 text-sm opacity-60">Click to return to move</p>
        </div>

        <div className="game-board p-10 pb-0 md:col-span-2 h-full">
          {/* Status */}
          <div className="status">{status}</div>

          {/* Board */}
          <div className="board-row">
            <Square
              value={squares[0]}
              onSquareClick={() => handleClick(0)}
              isWinningSquare={isWinningSquare(0)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[1]}
              onSquareClick={() => handleClick(1)}
              isWinningSquare={isWinningSquare(1)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[2]}
              onSquareClick={() => handleClick(2)}
              isWinningSquare={isWinningSquare(2)}
              isDraw={isDraw()}
            />
          </div>
          <div className="board-row">
            <Square
              value={squares[3]}
              onSquareClick={() => handleClick(3)}
              isWinningSquare={isWinningSquare(3)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[4]}
              onSquareClick={() => handleClick(4)}
              isWinningSquare={isWinningSquare(4)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[5]}
              onSquareClick={() => handleClick(5)}
              isWinningSquare={isWinningSquare(5)}
              isDraw={isDraw()}
            />
          </div>
          <div className="board-row">
            <Square
              value={squares[6]}
              onSquareClick={() => handleClick(6)}
              isWinningSquare={isWinningSquare(6)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[7]}
              onSquareClick={() => handleClick(7)}
              isWinningSquare={isWinningSquare(7)}
              isDraw={isDraw()}
            />
            <Square
              value={squares[8]}
              onSquareClick={() => handleClick(8)}
              isWinningSquare={isWinningSquare(8)}
              isDraw={isDraw()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Game
