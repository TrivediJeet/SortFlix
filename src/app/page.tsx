"use client";

import Info from "@/components/Info";
import Snippet from "@/components/Snippet";
import Selector from "@/components/Selector";
import Controls from "@/components/Controls";
import ArrayVisualizer from "@/components/ArrayVisualizer";

import { SortingProvider } from "@/context/sortingcontext";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-300 gap-8">
      <SortingProvider>
        <TextGenerateEffect
          className="text-center text-[40px] md:text-5xl"
          words="SortFlix"
        />
        <div className="flex flex-col items-center justify-center w-[90vw] 2xl:w-[50%] bg-black rounded-lg shadow-md p-6 mt-[-2rem]">
          <Selector />
          <ArrayVisualizer />
          <Controls />
        </div>
        <Info />
        <Snippet />
      </SortingProvider>
    </main>
  );
}
