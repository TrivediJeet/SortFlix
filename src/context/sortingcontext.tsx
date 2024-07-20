"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const ARRAY_SIZE = 10;

interface SortingContextProps {
    array: number[];
    setArray: React.Dispatch<React.SetStateAction<number[]>>;
    isSorting: boolean;
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    step: () => void;
    resetArray: () => void;
    selectedAlgorithm: string | null;
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string | null>>;
    rerender: boolean,
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
    const [speed, setSpeed] = useState(50);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
    const [rerender, setRerender] = useState(false);

    const bubbleSortGeneratorRef = useRef<Generator<number[]>>();

    useEffect(() => {
        // Generate initial random array
        resetArray();
    }, []);

    const step = () => {
        if (!isSorting) {
            setIsSorting(true);
            if (selectedAlgorithm === "bubbleSort") {
                bubbleSortGeneratorRef.current = bubbleSort(array);
            }
        }

        if (isSorting) {
            if (selectedAlgorithm === "bubbleSort") {
                // Check if generator exists, if not, create a new one
                if (!bubbleSortGeneratorRef.current) {
                    bubbleSortGeneratorRef.current = bubbleSort(array);
                }

                const generator = bubbleSortGeneratorRef.current;
                const nextStep = generator.next();

                if (!nextStep.done) {
                    setArray(nextStep.value);
                } else {
                    setIsSorting(false);
                    bubbleSortGeneratorRef.current = undefined;
                }

                // After updating the array, trigger a re-render
                setRerender(prev => !prev);
            }
        }
    };

    const resetArray = () => {
        // Create a new random array and set it to the state
        setArray(generateRandomArray(ARRAY_SIZE)); //TODO: Make size dynamic (maybe another selector?)
    };

    return (
        <SortingContext.Provider
            value={{
                array,
                setArray,
                isSorting,
                setIsSorting,
                speed,
                setSpeed,
                step,
                resetArray,
                selectedAlgorithm,
                setSelectedAlgorithm,
                rerender,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};

//TODO: Move to util.ts
export function generateRandomArray(size: number, min = 5, max = 100): number[] {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomArray;
}

function* bubbleSort(arr: number[]): Generator<number[]> {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                yield [...arr]; // Yield a copy of the array after each swap
            }
        }
    }
    return arr; // Signal that the algorithm is finished
}