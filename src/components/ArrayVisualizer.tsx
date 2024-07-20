"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

import { useSortingContext } from "@/context/sortingcontext";

const ArrayVisualizer: FC = () => {
    const { array, isSorting, rerender } = useSortingContext();
    const [barHeights, setBarHeights] = useState<number[]>(array);

    useEffect(() => {
        if (isSorting) {
            // Update the barHeights to reflect the new state of the array after each sorting step
            setBarHeights(array);
        } else {
            // Reset the bar heights when not sorting
            setBarHeights(array.map((val) => val));
        }
    }, [array, isSorting, rerender]);

    return (
        <div className="flex gap-2 justify-center">
            {barHeights.map((value, idx) => (
                <motion.div
                    key={idx}
                    className="bg-blue-500"
                    style={{
                        height: `${value * 2}px`,
                        width: "20px",
                    }}
                    layout // Enable layout animations
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: value / Math.max(...array) }} // Normalize the height
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        duration: 0.3,
                    }}
                />
            ))}
        </div>
    );
};

export default ArrayVisualizer;
