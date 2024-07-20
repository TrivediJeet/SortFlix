"use client";

import AlgorithmSelector from "@/components/AlgorithmSelector";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import Controls from "@/components/Controls";

import { SortingProvider } from "@/context/sortingcontext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <SortingProvider>
      <AlgorithmSelector /> 
      <ArrayVisualizer />
      <Controls />
    </SortingProvider> 
  </main>
  );
}
