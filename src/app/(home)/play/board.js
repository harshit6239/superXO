import Image from "next/image";

export default function Board({ gameState, handleBoardClick }) {
    const board = gameState.miniBoards;

    return (
        <div className="play-grid">
            {board.map((block, i) => (
                <div
                    key={i}
                    className={
                        "relative " +
                        (block.isActive
                            ? "outer-grid-block-active "
                            : "outer-grid-block-inactive ") +
                        (block.isFinished && "opacity-50 ")
                    }
                >
                    {block.isFinished && block.winner && (
                        <Image
                            priority={true}
                            src={`/${block.winner}-blue.svg`}
                            alt={block.winner}
                            width={100}
                            height={100}
                            className="w-full h-auto absolute z-10"
                        />
                    )}
                    {!block.isFinished &&
                        block.game.map((cell, j) => (
                            <div
                                key={i * 9 + j}
                                className={
                                    "bg-gray-400 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)] p-1 " +
                                    (block.isActive &&
                                        "hover:scale-110 transition-transform ease-in-out")
                                }
                                onClick={() =>
                                    handleBoardClick(gameState, i, j)
                                }
                            >
                                {cell !== "" && (
                                    <Image
                                        priority={true}
                                        src={`/${cell}-blue.svg`}
                                        alt={cell}
                                        width={100}
                                        height={100}
                                        className="w-full h-full "
                                    />
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
