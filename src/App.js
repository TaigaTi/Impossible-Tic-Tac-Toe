import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // Handle Square Click
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  // Print Game Status
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {/* Status */}
      <div className="status">{status}</div>

      {/* Board */}
      <div className="board-row">
        <Square
          className="s1"
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          className="s2"
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          className="s3"
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          className="s4"
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          className="s5"
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          className="s6"
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          className="s7"
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          className="s8"
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          className="s9"
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

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

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <div className="move-container">
          <button className="move-button" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <h1>Game History</h1>
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  );
}

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
    winner = "Draw";
  }

  // Check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
    }
  }

  return winner;
}
