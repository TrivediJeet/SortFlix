"use client";

import Info from "@/components/Info";
import Snippet from "@/components/Snippet";
import Selector from "@/components/Selector";
import Controls from "@/components/Controls";
import ArrayVisualizer from "@/components/ArrayVisualizer";

import { SortingProvider } from "@/context/sortingcontext";

export default function Home() {
  return (
    <SortingProvider>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Selector />
        <ArrayVisualizer />
        <Controls />
      </div>

      {/* 
        <div>
          <Info />
          <Snippet />
        </div>
      */}
    </SortingProvider>
  );
}
