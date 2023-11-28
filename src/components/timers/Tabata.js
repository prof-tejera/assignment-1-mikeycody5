import React, { useState, useEffect, useCallback } from "react";
import Button from "../timers/shared/button.js";
import DisplayTime from "../timers/shared/DisplayTime.js";
import Panel from "../timers/shared/Panel.js";
import Input from "../timers/shared/input.js";
import ProgressBar from "../timers/shared/ProgressBar.js";
import DisplayRounds from "../timers/shared/DisplayRounds";
import { FaPlay, FaPause, FaFastForward } from "react-icons/fa";

const Tabata = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0);

  useCallback(() => {
    setCurrentRound((prevRound) => prevRound + 1);
    setIsResting(true);
    setTime(initialTime);
    setRunning(true);
  }, [initialTime]);

  const calculateProgress = () => {
    if (isResting) {
      return (time / initialTime) * 100;
    } else {
      return ((initialTime - time) / initialTime) * 100;
    }
  };

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => Math.max(0, prevTime - 1000));
        // Update progress during the rest period
        if (isResting) {
          const remainingTime = time / initialTime;
          setProgress(1000 - remainingTime * 1000);
        }
      }, 1000);
    } else if (running && time === 0) {
      clearInterval(interval);
      if (isResting) {
        setIsResting(false);
        setCurrentRound((prevRound) => prevRound + 1);
        setTime(initialTime);
        setRunning(true);
        setProgress(0); // Reset progress when starting a new round
      } else {
        setIsResting(true);
        setTime(initialTime);
        setRunning(true);
      }

      if (currentRound >= rounds) {
        setCurrentRound(1);
        setIsResting(false);
        setTime(0);
        setRunning(false);
        setProgress(0); // Reset progress when the timer stops
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, time, isResting, initialTime, currentRound, rounds]);

  const handleStart = () => {
    if (!running) {
      if (time === 0) {
        setInitialTime((minutes * 60 + seconds) * 1000);
        setTime((minutes * 60 + seconds) * 1000);
      }
      setIsResting(false);
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setInitialTime((minutes * 60 + seconds) * 1000);
    setTime((minutes * 60 + seconds) * 1000);
    setCurrentRound(1);
    setRunning(false);
    setProgress(0); // Reset progress when the timer is reset
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
      <div className="display-time">
        {isResting ? (
          // If in rest state, display progress bar
          <ProgressBar value={calculateProgress()} max="100" />
        ) : (
          <DisplayTime time={time} />
        )}
      </div>
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

export default Tabata;
