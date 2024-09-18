"use client";

import Board from "./board";
import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import boardFunctions from "./boardFunctions";
import toast, { Toaster } from "react-hot-toast";
import GameHud from "./gameHud";
// import evaluateGameState from "./gameAI";

export default function Play() {
    const initialMiniBoardState = {
        isActive: true,
        isFinished: false,
        winner: null,
        game: ["", "", "", "", "", "", "", "", ""],
    };
    const initialState = {
        turn: null,
        isFinished: false,
        winner: null,
        miniBoards: [],
    };
    for (let i = 0; i < 9; i++) {
        initialState.miniBoards.push(initialMiniBoardState);
    }
    const [gameState, setGameState] = useState(initialState);

    const [currentPage, setCurrentPage] = useState("newGame");

    const handleBoardClick = (gameState, i, j) => {
        const evalMove = boardFunctions.handleBoardClick(gameState, i, j);
        if (evalMove === null) {
            toast.error("Invalid move", {
                duration: 3000,
                style: {
                    backgroundColor: "#333",
                    color: "#fff",
                },
                position: "top-right",
            });
            return;
        }
        if (evalMove.gameOver) {
            toast.success(
                `Game over! ${
                    evalMove.newGameState.winner
                        ? evalMove.newGameState.winner + " wins"
                        : "It's a draw"
                }`,
                {
                    duration: 3000,
                    style: {
                        backgroundColor: "#333",
                        color: "#fff",
                    },
                    position: "top-right",
                }
            );
            setP1Active(false);
            setP2Active(false);
            return;
        }
        if (evalMove.miniBoardGameOver !== undefined) {
            toast.success(
                `Mini board ${evalMove.miniBoardGameOver + 1} is finished`,
                {
                    duration: 3000,
                    style: {
                        backgroundColor: "#333",
                        color: "#fff",
                    },
                    position: "top-right",
                }
            );
        }
        setGameState(evalMove.newGameState);
        // evaluateGameState(evalMove.newGameState, "X")
        //     .then((score) => {
        //         console.log("Game score for player X:", score);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    const [p1Name, setP1Name] = useState("Player 1");
    const [p2Name, setP2Name] = useState("Player 2");

    const [p1TempName, setP1TempName] = useState("");
    const [p2TempName, setP2TempName] = useState("");

    const [inGame, setInGame] = useState(false);

    const {
        time: p1Time,
        setIsActive: setP1Active,
        setTime: setP1Time,
    } = useTimer(600000);
    const {
        time: p2Time,
        setIsActive: setP2Active,
        setTime: setP2Time,
    } = useTimer(600000);

    useEffect(() => {
        if (gameState.turn === "X") {
            setP1Active(true);
            setP2Active(false);
        } else if (gameState.turn === "O") {
            setP1Active(false);
            setP2Active(true);
        } else {
            setP1Active(false);
            setP2Active(false);
        }
    }, [gameState.turn]);

    useEffect(() => {
        if (p1Time <= 0 || p2Time <= 0) {
            setP1Active(false);
            setP2Active(false);
            setGameState(initialState);
        }
    }, [p1Time, p2Time]);

    useEffect(() => {
        setP1Time(600000);
        setP2Time(600000);
        if (inGame) {
            setGameState({ ...initialState, turn: "X" });
        } else {
            setGameState(initialState);
        }
    }, [inGame]);

    return (
        <div className="flex grow pl-12 pr-12 justify-start items-center bg-gray-900 gap-4 ">
            <div className="flex flex-col gap-4 ">
                <GameHud
                    name={p2Name}
                    playerPiece="O"
                    time={p2Time}
                    gameState={gameState}
                />
                <Board
                    inGame={inGame}
                    gameState={gameState}
                    handleBoardClick={handleBoardClick}
                />
                <GameHud
                    name={p1Name}
                    playerPiece="X"
                    time={p1Time}
                    gameState={gameState}
                />
            </div>
            <div className="bg-gray-700 h-[95vh] rounded-lg grow overflow-hidden  ">
                {!inGame && (
                    <div className="flex grow text-gray-300 font-bold">
                        <button
                            className={
                                "p-4 flex grow justify-center items-center " +
                                (currentPage == "newGame"
                                    ? "bg-gray-700 rounded-lg rounded-b-none "
                                    : "bg-gray-800 ")
                            }
                            onClick={() => setCurrentPage("newGame")}
                        >
                            New Game
                        </button>
                        <button
                            className={
                                "p-4 flex grow justify-center items-center " +
                                (currentPage == "localGame"
                                    ? "bg-gray-700 "
                                    : "bg-gray-800 ")
                            }
                            onClick={() => setCurrentPage("localGame")}
                        >
                            Play locally
                        </button>
                    </div>
                )}
                {
                    {
                        newGame: (
                            <div className="flex flex-col gap-4 p-4"></div>
                        ),
                        localGame: (
                            <div className="flex flex-col gap-4 p-4">
                                <input
                                    type="text"
                                    placeholder="Player 1 name"
                                    className="p-2 rounded-lg bg-gray-800 text-gray-300"
                                    value={p1TempName}
                                    onChange={(e) =>
                                        setP1TempName(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Player 2 name"
                                    className="p-2 rounded-lg bg-gray-800 text-gray-300"
                                    value={p2TempName}
                                    onChange={(e) =>
                                        setP2TempName(e.target.value)
                                    }
                                />
                                <button
                                    className="bg-gray-400 rounded-lg p-2 font-bold text-2xl"
                                    onClick={() => {
                                        if (!inGame) {
                                            if (p1TempName.trim() !== "") {
                                                setP1Name(p1TempName);
                                            }
                                            if (p2TempName.trim() !== "") {
                                                setP2Name(p2TempName);
                                            }
                                        } else {
                                            setP1Name("Player 1");
                                            setP2Name("Player 2");
                                        }
                                        setInGame((game) => !game);
                                    }}
                                >
                                    {!inGame ? "Start Game" : "End Game"}
                                </button>
                            </div>
                        ),
                    }[currentPage]
                }
            </div>
            <Toaster />
        </div>
    );
}
