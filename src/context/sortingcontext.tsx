"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { AlgorithmInfo, algorithmInfoRecord } from "@/utils/algorithmInfo";
import { bubbleSort, generateRandomArray, mergeSort, quickSort } from "@/utils/sortingAlgorithms";

const ARRAY_SIZE = 10;

interface SortingContextProps {
    array: number[];
    setArray: React.Dispatch<React.SetStateAction<number[]>>;
    isSorting: boolean;
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
    isAutoSorting: boolean,
    startSorting: () => void,
    stopSorting: () => void,
    startAutoSorting: () => void,
    pauseAutoSorting: () => void,
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    step: () => void;
    resetArray: () => void;
    selectedAlgorithm: string | null;
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string | null>>;
    rerender: boolean,
    algoInfo: AlgorithmInfo | null,
}

const SortingContext = createContext<SortingContextProps | undefined>(undefined);

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
    const [isSorting, setIsSorting] = useState(false);
    const [isAutoSorting, setIsAutoSorting] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
    const [rerender, setRerender] = useState(false);
    const [algoInfo, setAlgoinfo] = useState<AlgorithmInfo | null>(null);

    const currentAlgorithmGeneratorRef = useRef<Generator<number[]>>();

    // Generate a new array on initial mount
    useEffect(() => {
        resetArray();
      }, [])

    useEffect(() => {
        if (selectedAlgorithm) {
            currentAlgorithmGeneratorRef.current = undefined; // Reset the generator
            setAlgoinfo(algorithmInfoRecord[selectedAlgorithm]);
        }
    }, [selectedAlgorithm])

    const step = useCallback(() => {
        if (!currentAlgorithmGeneratorRef.current) {
          // Initialize the generator based on the selected algorithm
            if (selectedAlgorithm === "bubbleSort" ) {
                currentAlgorithmGeneratorRef.current = bubbleSort(array);
            } else if (selectedAlgorithm === "mergeSort") {
                currentAlgorithmGeneratorRef.current = mergeSort(array);
            } else if (selectedAlgorithm === "quickSort") {
                currentAlgorithmGeneratorRef.current = quickSort(array, 0, array.length - 1);
            } 
        }
    
        const generator = currentAlgorithmGeneratorRef.current;
        if (generator) {
          const nextStep = generator.next();
    
          if (!nextStep.done) {
            setArray(nextStep.value);
            setRerender(prev => !prev); // Trigger re-render
          } else {
            setIsSorting(false);
            setIsAutoSorting(false);
            currentAlgorithmGeneratorRef.current = undefined; // Reset the generator
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

    const startSorting = () => {
        setIsSorting(true);
    };

    const startAutoSorting = () => {
        setIsAutoSorting(true);
        setIsSorting(true);
    }

    const stopSorting = () => {
        setIsSorting(false);
        setIsAutoSorting(false);
    };

    const pauseAutoSorting = () => {
        setIsAutoSorting(false);
    }

    const resetArray = () => {
        // Create a new random array and set it to the state
        setArray(generateRandomArray(ARRAY_SIZE));
    };

    return (
        <SortingContext.Provider
            value={{
                array,
                setArray,
                isSorting,
                setIsSorting,
                isAutoSorting,
                startAutoSorting,
                startSorting,
                stopSorting,
                speed,
                setSpeed,
                step,
                resetArray,
                selectedAlgorithm,
                setSelectedAlgorithm,
                rerender,
                pauseAutoSorting,
                algoInfo,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};