"use client";

import React, { useState, useEffect } from "react";

import { useSortingContext } from "@/context/sortingcontext";

interface Algorithm {
  name: string;
  value: string;
}

const AlgorithmSelector: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const { setSelectedAlgorithm: contextSetSelectedAlgorithm } = useSortingContext();

  const algorithms: Algorithm[] = [
    { name: "Bubble Sort", value: "bubbleSort" },
    { name: "Merge Sort", value: "mergeSort" },
    { name: "Quick Sort", value: "quickSort" },
  ];

  useEffect(() => {
    if (selectedAlgorithm) {
      contextSetSelectedAlgorithm(selectedAlgorithm.value);
    }
  }, [selectedAlgorithm, contextSetSelectedAlgorithm]);

  const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedAlgorithm(algorithms.find(algo => algo.value === selectedValue) || null);
  };

  return (
    <div>
      <label htmlFor="algorithmSelect" className="block text-sm font-medium text-gray-700">
        Select Algorithm:
      </label>
      <select
        id="algorithmSelect"
        value={selectedAlgorithm?.value || ""}
        onChange={handleAlgorithmChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">-- Select --</option>
        {algorithms.map((algorithm) => (
          <option key={algorithm.value} value={algorithm.value}>
            {algorithm.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;