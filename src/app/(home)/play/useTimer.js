import { useEffect, useState, useRef } from "react";

export default function useTimer(ms) {
    const [time, setTime] = useState(ms);
    const [isActive, setIsActive] = useState(false);
    const timer = useRef(null);

    useEffect(() => {
        // console.log("rendered");
        if (isActive) {
            timer.current = setTimeout(() => {
                setTime((time) => time - 1000);
            }, 1000);
            if (time <= 0) {
                clearTimeout(timer.current);
            }
        } else {
            clearTimeout(timer.current);
        }

        return () => {
            clearTimeout(timer.current);
        };
    }, [time, isActive]);

    return { time, setIsActive, setTime };
}
