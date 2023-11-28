import React, { useState, useEffect, useCallback, } from "react";
import Button from "../timers/shared/button.js";
import DisplayTime from "../timers/shared/DisplayTime.js";
import Panel from "../timers/shared/Panel.js";
import Input from "../timers/shared/input.js";
import DisplayRounds from "../timers/shared/DisplayRounds";
import { FaPlay, FaPause, FaFastForward } from "react-icons/fa";

const XY = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);

  const handleNextRound = useCallback(() => {
    if (currentRound < rounds) {
      setCurrentRound(currentRound + 1);
      setTime(initialTime);
      setRunning(true);
    }
  }, [currentRound, rounds, initialTime]);

  const handleTimerFinish = useCallback(() => {
    if (currentRound < rounds) {
      handleNextRound();
    } else {
      setCurrentRound(1);
      setTime(0);
      setRunning(false);
    }
  }, [currentRound, rounds, handleNextRound]);

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (running && time === 0) {
      clearInterval(interval);
      handleTimerFinish();
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, time, handleTimerFinish]);

  const handleStart = () => {
    if (!running) {
      if (time === 0) {
        setInitialTime((minutes * 60 + seconds) * 1000);
        setTime((minutes * 60 + seconds) * 1000);
      } else {
        setInitialTime(time);
      }
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setInitialTime((minutes * 60 + seconds) * 1000);
    setTime((minutes * 60 + seconds) * 1000);
    if (running) {
      setRunning(false);
    }
  };

  const handleFastForward = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div className="timer">
      <DisplayRounds
        currentRound={currentRound}
        initialRounds={rounds}
        onRoundsChange={setRounds}
      />
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

export default XY;
