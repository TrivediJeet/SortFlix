"use client";

import React from "react";

import { useSortingContext } from "@/context/sortingcontext";

const Controls: React.FC = () => {
  const {
    isAutoSorting,
    startAutoSorting,
    pauseAutoSorting,
    speed,
    setSpeed,
    step,
    resetArray,
    selectedAlgorithm,
  } = useSortingContext();

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(event.target.value, 10));
  };

  return (
    <div className="mt-4 flex justify-center space-x-4">
      {/* <button
        onClick={pauseAutoSorting}
        className="px-4 py-2 bg-orange-500 text-white rounded"
      >
        Pause
      </button> */}

      <button
        onClick={step}
        className="px-4 py-2 bg-green-500 text-white rounded"
        disabled={!selectedAlgorithm}
      >
        Step
      </button>

      <button
        onClick={isAutoSorting ? pauseAutoSorting : startAutoSorting}
        className="px-4 py-2 bg-green-500 text-white rounded"
        disabled={!selectedAlgorithm}
      >
        {isAutoSorting ? "Pause" : "Auto Sort"}
      </button>

      <button
        onClick={resetArray}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Generate New Array
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