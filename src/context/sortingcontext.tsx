"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AlgorithmInfo, algorithmInfoRecord } from "@/utils/algorithmInfo";
import {
  bubbleSort,
  countingSort,
  generateRandomArray,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
  shellSort,
} from "@/utils/sortingAlgorithms";
import { sortingAlgorithms } from "@/components/Selector";

const ARRAY_SIZE = 25;

type AlgorithmFunction = (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparisonIndices: React.Dispatch<React.SetStateAction<number[]>>,
  ...args: any[]
) => Generator<number[]>;

const algorithmMap: Record<string, AlgorithmFunction> = {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
  shellSort,
  countingSort,
};

interface SortingContextProps {
  array: number[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  isAutoSorting: boolean;
  startAutoSorting: () => void;
  pauseAutoSorting: () => void;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  step: () => void;
  resetArray: () => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  algoInfo: AlgorithmInfo | null;
  comparisonIndices: number[];
}

const SortingContext = createContext<SortingContextProps | undefined>(
  undefined
);

export const useSortingContext = () => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error("useSortingContext must be used within a SortingProvider");
  }
  return context;
};

export const SortingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    sortingAlgorithms["Bubble Sort"]
  );
  const [algoInfo, setAlgoinfo] = useState<AlgorithmInfo | null>(null);
  const [comparisonIndices, setComparisonIndices] = useState<number[]>([]);

  const currentAlgorithmGeneratorRef = useRef<Generator<number[]>>();

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    if (selectedAlgorithm) {
      currentAlgorithmGeneratorRef.current = undefined; // Reset the generator
      setAlgoinfo(algorithmInfoRecord[selectedAlgorithm]);
    }
  }, [selectedAlgorithm]);

  const step = useCallback(() => {
    if (!currentAlgorithmGeneratorRef.current) {
      // Initialize the generator based on the selected algorithm
      const algorithmFunction = algorithmMap[selectedAlgorithm!];
      currentAlgorithmGeneratorRef.current = algorithmFunction([...array], setArray, setComparisonIndices);
    }

    const generator = currentAlgorithmGeneratorRef.current;

    if (generator) {
      const nextStep = generator.next();

      if (nextStep.done) {
        setIsAutoSorting(false);
        currentAlgorithmGeneratorRef.current = undefined;
      }
    }
  }, [selectedAlgorithm, array]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoSorting) {
      intervalId = setInterval(() => {
        step();
      }, 3000 / speed);
    }

    return () => clearInterval(intervalId);
  }, [isAutoSorting, speed, step]);

  const startAutoSorting = () => {
    setIsAutoSorting(true);
  };

  const pauseAutoSorting = () => {
    setIsAutoSorting(false);
  };

  const resetArray = () => {
    // Create a new random array and set it to the state
    setArray(generateRandomArray(ARRAY_SIZE));
    setComparisonIndices([]);
    currentAlgorithmGeneratorRef.current = undefined;
  };

  return (
    <SortingContext.Provider
      value={{
        array,
        setArray,
        isAutoSorting,
        startAutoSorting,
        speed,
        setSpeed,
        step,
        resetArray,
        selectedAlgorithm,
        setSelectedAlgorithm,
        pauseAutoSorting,
        algoInfo,
        comparisonIndices,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};
