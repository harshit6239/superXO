const checkMiniBoardWin = (game) => {
    for (let i = 0; i < game.length; i += 3) {
        if (
            game[i] === game[i + 1] &&
            game[i] === game[i + 2] &&
            game[i] !== ""
        ) {
            return game[i];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (
            game[i] === game[i + 3] &&
            game[i] === game[i + 6] &&
            game[i] !== ""
        ) {
            return game[i];
        }
    }
    if (game[0] === game[4] && game[0] === game[8] && game[0] !== "") {
        return game[0];
    }
    if (game[2] === game[4] && game[2] === game[6] && game[2] !== "") {
        return game[2];
    }
    return null;
};

const checkBoardWin = (miniBoards) => {
    for (let i = 0; i < miniBoards.length; i += 3) {
        if (
            miniBoards[i].winner === miniBoards[i + 1].winner &&
            miniBoards[i].winner === miniBoards[i + 2].winner &&
            miniBoards[i].winner !== null
        ) {
            return miniBoards[i].winner;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (
            miniBoards[i].winner === miniBoards[i + 3].winner &&
            miniBoards[i].winner === miniBoards[i + 6].winner &&
            miniBoards[i].winner !== null
        ) {
            return miniBoards[i].winner;
        }
    }
    if (
        miniBoards[0].winner === miniBoards[4].winner &&
        miniBoards[0].winner === miniBoards[8].winner &&
        miniBoards[0].winner !== null
    ) {
        return miniBoards[0].winner;
    }
    if (
        miniBoards[2].winner === miniBoards[4].winner &&
        miniBoards[2].winner === miniBoards[6].winner &&
        miniBoards[2].winner !== null
    ) {
        return miniBoards[2].winner;
    }
    return null;
};

const copyGameState = (gameState) => {
    const newGameState = {
        ...gameState,
    };
    for (let i = 0; i < 9; i++) {
        newGameState.miniBoards[i] = {
            ...gameState.miniBoards[i],
            game: [...gameState.miniBoards[i].game],
        };
    }
    return newGameState;
};

const checkMiniBoardDraw = (game) => {
    return game.every((cell) => cell !== "");
};

const checkBoardDraw = (miniBoards) => {
    return miniBoards.every((miniBoard) => miniBoard.isFinished);
};

const handleBoardClick = (gameState, i, j) => {
    let evalMove = {};
    if (gameState.isFinished) {
        evalMove.newGameState = gameState;
        evalMove.gameOver = true;
        return evalMove;
    }
    const newGameState = copyGameState(gameState);
    const miniBoard = newGameState.miniBoards[i];
    if (
        miniBoard.isFinished ||
        !miniBoard.isActive ||
        miniBoard.game[j] !== ""
    ) {
        return null;
    }
    miniBoard.game[j] = newGameState.turn;
    const miniBoardwinner = checkMiniBoardWin(miniBoard.game);
    if (miniBoardwinner) {
        miniBoard.isFinished = true;
        miniBoard.winner = miniBoardwinner;
        evalMove.miniBoardGameOver = i;
        const winner = checkBoardWin(newGameState.miniBoards);
        if (winner) {
            newGameState.isFinished = true;
            newGameState.winner = winner;
            newGameState.miniBoards.forEach((miniBoard) => {
                miniBoard.isActive = false;
            });
            evalMove.newGameState = newGameState;
            evalMove.gameOver = true;
            evalMove.miniBoardGameOver = i;
            return evalMove;
        }
        if (checkBoardDraw(newGameState.miniBoards)) {
            newGameState.isFinished = true;
            newGameState.winner = null;
            newGameState.miniBoards.forEach((miniBoard) => {
                miniBoard.isActive = false;
            });
            evalMove.newGameState = newGameState;
            evalMove.gameOver = true;
            evalMove.miniBoardGameOver = i;
            return evalMove;
        }
    } else {
        if (checkMiniBoardDraw(miniBoard.game)) {
            miniBoard.isFinished = true;
            evalMove.gameOver = false;
            evalMove.miniBoardGameOver = i;
        }
        if (checkBoardDraw(newGameState.miniBoards)) {
            newGameState.isFinished = true;
            newGameState.winner = null;
            evalMove.newGameState = newGameState;
            evalMove.gameOver = true;
            return evalMove;
        }
    }
    newGameState.turn = newGameState.turn === "X" ? "O" : "X";
    if (newGameState.miniBoards[j].isFinished) {
        newGameState.miniBoards.forEach((miniBoard) => {
            if (miniBoard.isFinished) {
                miniBoard.isActive = false;
            } else {
                miniBoard.isActive = true;
            }
        });
    } else {
        newGameState.miniBoards.forEach((miniBoard) => {
            miniBoard.isActive = false;
        });
        newGameState.miniBoards[j].isActive = true;
    }
    evalMove.newGameState = newGameState;
    return evalMove;
};

const getTimeString = (time) => {
    const seconds = Math.floor((time / 1000) % 60)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((time / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
};

const boardFunctions = {
    checkMiniBoardWin,
    checkBoardWin,
    handleBoardClick,
    getTimeString,
};
export default boardFunctions;
