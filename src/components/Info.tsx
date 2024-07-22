"use client";

import React from "react";

import { useSortingContext } from "@/context/sortingcontext";

const Info: React.FC = () => {
    const {
        algoInfo
    } = useSortingContext();

    return (
        <>
            {algoInfo && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">{algoInfo.title}</h2>
                    <p className="text-gray-600 mb-4">{algoInfo.description}</p>
                    <div className="flex justify-between">
                        <p>
                            <strong>Time Complexity:</strong> {algoInfo.complexity.time}
                        </p>
                        <p>
                            <strong>Space Complexity:</strong> {algoInfo.complexity.space}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Info;
