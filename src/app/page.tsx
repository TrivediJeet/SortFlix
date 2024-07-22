"use client";

import Info from "@/components/Info";
import Snippet from "@/components/Snippet";
import Selector from "@/components/Selector";
import Controls from "@/components/Controls";
import ArrayVisualizer from "@/components/ArrayVisualizer";

import { SortingProvider } from "@/context/sortingcontext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SortingProvider>
        <Info />
        <Selector />
        <ArrayVisualizer />
        <Controls />
        <Snippet />
      </SortingProvider>
    </main>
  );
}
