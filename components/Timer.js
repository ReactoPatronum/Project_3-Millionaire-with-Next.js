import { useState } from "react";
import { useEffect } from "react";

const Timer = ({ next, timerId, setEndGame, falseAns}) => {
  const [seconds, setSeconds] = useState(20);
  useEffect(() => {
    setSeconds(20);
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [next]);

  useEffect(() => {
    if (seconds <= -1) {
      setEndGame(false);
      falseAns();
    }
  }, [seconds]);
  return seconds;
};

export default Timer;
