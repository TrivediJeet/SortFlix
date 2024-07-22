"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

import { useSortingContext } from "@/context/sortingcontext";

const ArrayVisualizer: FC = () => {
  const { array, isSorting } = useSortingContext();
  const [barHeights, setBarHeights] = useState<number[]>(array);

  useEffect(() => {
    if (isSorting) {
      setBarHeights(array);
    } else {
      setBarHeights(array.map((val) => val));
    }
  }, [array, isSorting]);

  const BAR_WIDTH = 20; // Define bar width
  const MAX_HEIGHT = 400; // Maximum bar height

  // Calculate bar heights based on max value in array
  const normalizedBarHeights = barHeights.map(
    (value) => (value / Math.max(...array)) * MAX_HEIGHT
  ); // This is where normalizedBarHeights is calculated

  return (
    <div
      className="flex-1 flex flex-col items-end"
      style={{ height: `${MAX_HEIGHT}px` }} // Fixed container height
    >
      <div className="flex space-x-2 items-end">
        {normalizedBarHeights.map((height, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-500 origin-bottom"
            style={{
              height: `${height}px`,
              width: `${BAR_WIDTH}px`,
            }}
            layout // Enable layout animations
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 80 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
