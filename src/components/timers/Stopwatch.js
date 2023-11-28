import React, { useState, useEffect } from "react";
import Button from "../timers/shared/button.js";
import DisplayTime from "../timers/shared/DisplayTime.js";
import Panel from "../timers/shared/Panel.js";
import { FaPlay, FaPause, } from "react-icons/fa";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  return (
    <div className="stopwatch">
      <DisplayTime time={time} />
      <Panel>
        <Button onClick={handleStart}>
          <FaPlay />
        </Button>
        <Button onClick={handleStop}>
          <FaPause />
        </Button>
        <Button onClick={handleReset}>
          RESET 
        </Button>
      </Panel>
    </div>
  );
};

export default Stopwatch;