import React, { useState, useEffect } from "react";
import Button from "../timers/shared/button.js";
import DisplayTime from "../timers/shared/DisplayTime.js";
import Panel from "../timers/shared/Panel.js";
import Input from "../timers/shared/input.js"; // Adjust the import path
import { FaPlay, FaPause, FaFastForward } from "react-icons/fa"; // Import the fast forward icon

const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const handleStart = () => {
    if (!running) {
      if (time === 0) {
        setTime((minutes * 60 + seconds) * 1000);
      }
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setTime((minutes * 60 + seconds) * 1000);
    if (running) {
      setRunning(false);
    }
  };

  const handleFastForward = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div className="countdown">
      <Input
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
        disabled={running}
        onStart={handleStart}
      />
      <DisplayTime time={time} />
      <Panel>
        {running ? (
          <Button onClick={handleStop}>
            <FaPause />
          </Button>
        ) : (
          <Button onClick={handleStart}>
            <FaPlay />
          </Button>
        )}
        <Button onClick={handleReset}>RESET</Button>
        <Button onClick={handleFastForward}>
          <FaFastForward />
        </Button>
      </Panel>
    </div>
  );
};

export default Countdown;
