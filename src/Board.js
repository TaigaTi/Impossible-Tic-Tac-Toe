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
        if (winner[0] === -1) {
            status = "Winner: Draw";
        } else {
            status = "Winner: " + squares[winner[1]];
        }
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

    // Check For Winning Squares
    function isWinningSquare(index) {
        return winner && winner != [-1, -1, -1] && winner.includes(index);
    }

    function isDraw() {
        return winner && winner[0] == -1;
    }

    return (
        <div className="flex flex-col items-center ">
         

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

               {/* Status */}
               <div className="status pt-7">{status}</div>
        </div>
    );
}

export default Board