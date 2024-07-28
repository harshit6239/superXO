"use client";

import Board from "./board";
import { useState } from "react";
import boardFunctions from "./boardFunctions";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function Play() {
    const initialMiniBoardState = {
        isActive: true,
        isFinished: false,
        winner: null,
        game: ["", "", "", "", "", "", "", "", ""],
    };
    const initialState = {
        turn: "X",
        isFinished: false,
        winner: null,
        miniBoards: [],
    };
    for (let i = 0; i < 9; i++) {
        initialState.miniBoards.push(initialMiniBoardState);
    }
    const [gameState, setGameState] = useState(initialState);

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
    };

    return (
        <div className="flex grow pl-12 pr-12 justify-start items-center bg-gray-900 ">
            <div className="flex flex-col gap-4 ">
                <div
                    className={
                        "h-[5vh] rounded-lg p-2 " +
                        (gameState.turn === "O"
                            ? "bg-gray-300 "
                            : "bg-gray-400 ")
                    }
                >
                    <Image
                        priority={true}
                        src={"O-blue.svg"}
                        alt={"O"}
                        width={100}
                        height={100}
                        className="h-full w-auto"
                    />
                </div>
                <Board
                    gameState={gameState}
                    handleBoardClick={handleBoardClick}
                />
                <div
                    className={
                        "h-[5vh] rounded-lg p-2 " +
                        (gameState.turn === "X"
                            ? "bg-gray-300 "
                            : "bg-gray-400 ")
                    }
                >
                    <Image
                        priority={true}
                        src={"X-blue.svg"}
                        alt={"X"}
                        width={100}
                        height={100}
                        className=" h-full w-auto"
                    />
                </div>
            </div>
            <Toaster />
        </div>
    );
}
