function Square({ value, onSquareClick, isWinningSquare, isDraw }) {
    return (
        <>
            <button
                className={`square ${isWinningSquare ? "winning" : ""} ${isDraw ? "draw" : " "}`}
                onClick={onSquareClick}
            >
                {value}
            </button>
        </>
    );
}

export default Square