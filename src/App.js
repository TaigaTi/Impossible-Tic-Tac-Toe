import { useState } from "react";
import Board from "./Board";

function Game() {
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
      description = "Game Start";
    }

    return (
      <li key={move} className="w-full px-10">
        <div className="move-container w-full px-5">
          <button className="move-button w-full" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="title flex items-center justify-center p-3 pb-0 w-full">
        <h1 className="text-5xl">Tic Tac Toe</h1>
      </div>
      <div className="game grid grid-cols-1 md:grid-cols-3 justify-center text-center px-10 w-full">
        <div className="p-10 order-last md:order-first md:col-span-1 h-full">
          <div className="game-info h-full flex flex-col items-center">
            <h1 className="py-3">Game History</h1>
            <ol className="flex flex-col flex-start items-start pt-2 gap-3 w-full h-full">{moves}</ol>
          </div>
          <p className="pt-2 text-sm opacity-60">Click to return to move</p>
        </div>

        <div className="game-board p-10 pb-0 md:col-span-2 h-full">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
      </div>
    </>
  );
}

export default Game
