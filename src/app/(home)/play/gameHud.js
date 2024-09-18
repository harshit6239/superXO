import Image from "next/image";
import boardFunctions from "./boardFunctions";

export default function GameHud({ name, playerPiece, time, gameState }) {
    return (
        <div
            className={
                "h-[6vh] rounded-lg p-2 flex items-center gap-4 font-bold justify-between  " +
                (gameState.turn === playerPiece
                    ? "bg-gray-200 "
                    : "bg-gray-400 ")
            }
        >
            <div className="h-full w-max flex items-center gap-4 ">
                <Image
                    priority={true}
                    src={playerPiece + "-blue.svg"}
                    alt={playerPiece}
                    width={100}
                    height={100}
                    className="h-full w-auto "
                />
                <div>{name}</div>
            </div>
            <div
                className={
                    "h-full pl-4 pr-4 p-2 rounded-md flex items-center gap-4 border-solid border-2 border-gray-500 " +
                    (time < 60000 && gameState.turn === playerPiece
                        ? "bg-red-700 "
                        : "bg-gray-400 ")
                }
            >
                <Image
                    priority={true}
                    src={"/time.gif"}
                    alt="clock animation"
                    width={100}
                    height={100}
                    className={
                        "h-full w-auto " +
                        (gameState.turn === playerPiece && !gameState.isFinished
                            ? "opacity-100 "
                            : "opacity-0 ")
                    }
                />
                <div className="text-xl text-gray-100 ">
                    {boardFunctions.getTimeString(time)}
                </div>
            </div>
        </div>
    );
}
