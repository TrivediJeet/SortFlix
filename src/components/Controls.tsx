"use client";

import React from "react";

import { useSortingContext } from "@/context/sortingcontext";

const Controls: React.FC = () => {
  const {
    isSorting,
    setIsSorting,
    speed,
    setSpeed,
    step,
    resetArray,
    selectedAlgorithm,
  } = useSortingContext();

  const handleStart = () => {
    setIsSorting(true);
  };

  const handlePause = () => {
    setIsSorting(false);
  };

  const handleStep = () => {
    step();
  };

  const handleReset = () => {
    resetArray();
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(event.target.value, 10));
  };

  return (
    <div className="mt-4 flex justify-center space-x-4">
      {!isSorting && (
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start
        </button>
      )}
      {isSorting && (
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Pause
        </button>
      )}
      {isSorting && selectedAlgorithm && ( 
        <button
          onClick={handleStep}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Step
        </button>
      )}
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Reset
      </button>
      <input
        type="range"
        min="1"
        max="100"
        value={speed}
        onChange={handleSpeedChange}
        className="w-40"
      />
    </div>
  );
};

export default Controls;

