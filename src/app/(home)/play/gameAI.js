// Heuristic evaluation function for the game state
export default function evaluateGameState(gameState) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let score = 0;
            if (gameState.isFinished) {
                if (gameState.winner === "X") {
                    score += 100;
                } else if (gameState.winner === "O") {
                    score -= 100;
                }
                resolve(score);
            }
            gameState.miniBoards.forEach((miniBoard) => {
                score += evaluateMiniBoard(miniBoard, "X", "O");
            });
            // const score = evaluateGameStateSync(gameState);
            resolve(score);
        }, 0);
    });
}

// Evaluates a single mini-board
function evaluateMiniBoard(miniBoard, player, opponent) {
    let score = 0;

    if (miniBoard.isFinished) {
        if (miniBoard.winner === player) {
            score += 100; // AI won this mini-board
        } else if (miniBoard.winner === opponent) {
            score -= 100; // Opponent won this mini-board
        }
        return score; // Return immediately if the board is finished
    }

    // Score the unfinished board based on the current game state (game array)
    score += evaluateBoardCells(miniBoard.game, player, opponent);
    score += evaluateWinningThreats(miniBoard.game, player, opponent);

    return score;
}

// Evaluates the board cells for control and potential win/loss
function evaluateBoardCells(board, player, opponent) {
    let score = 0;

    // Rows, columns, and diagonals to check
    const lines = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    // Check each line (rows, columns, and diagonals)
    lines.forEach((line) => {
        const [a, b, c] = line;
        const lineScore = evaluateLine(
            board[a],
            board[b],
            board[c],
            player,
            opponent
        );
        score += lineScore;
    });

    return score;
}

// Evaluates a single line (row/column/diagonal) for the current player
function evaluateLine(cell1, cell2, cell3, player, opponent) {
    let score = 0;

    // Count how many cells in the line belong to the player and the opponent
    const playerCount = [cell1, cell2, cell3].filter(
        (cell) => cell === player
    ).length;
    const opponentCount = [cell1, cell2, cell3].filter(
        (cell) => cell === opponent
    ).length;

    // If the line has both player and opponent marks, it's neutral (no score)
    if (playerCount > 0 && opponentCount > 0) {
        return 0;
    }

    // Evaluate based on how close the player is to completing the line
    if (playerCount === 3) {
        score += 50; // Winning line for the player
    } else if (playerCount === 2 && opponentCount === 0) {
        score += 10; // Almost winning line for the player
    } else if (playerCount === 1 && opponentCount === 0) {
        score += 1; // Small advantage for player
    }

    // Evaluate based on how close the opponent is to completing the line
    if (opponentCount === 3) {
        score -= 50; // Opponent wins the line
    } else if (opponentCount === 2 && playerCount === 0) {
        score -= 10; // Opponent is close to winning the line
    } else if (opponentCount === 1 && playerCount === 0) {
        score -= 1; // Small advantage for opponent
    }

    return score;
}

// Check if there are any immediate winning or blocking threats
function evaluateWinningThreats(board, player, opponent) {
    let score = 0;

    // Rows, columns, and diagonals to check
    const lines = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    // Check each line for threats (either winning or blocking opportunities)
    lines.forEach((line) => {
        const [a, b, c] = line;
        const playerThreat = checkThreat(board[a], board[b], board[c], player);
        const opponentThreat = checkThreat(
            board[a],
            board[b],
            board[c],
            opponent
        );

        // Prioritize immediate wins for the player, and blocking opponent threats
        if (playerThreat) {
            score += 30; // Player can win this line in the next move
        }
        if (opponentThreat) {
            score -= 30; // Opponent can win this line in the next move
        }
    });

    return score;
}

// Check if there's a potential threat (2 marks and 1 empty cell)
function checkThreat(cell1, cell2, cell3, player) {
    const playerCount = [cell1, cell2, cell3].filter(
        (cell) => cell === player
    ).length;
    const emptyCount = [cell1, cell2, cell3].filter(
        (cell) => cell === ""
    ).length;

    // A threat exists if there are two marks from the same player and one empty cell
    return playerCount === 2 && emptyCount === 1;
}
