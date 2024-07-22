import React from 'react'

import CodeBlock from './ui/CodeBlock';
import { useSortingContext } from '@/context/sortingcontext';
import { sortingAlgorithmsStringRecord } from '@/utils/sortingAlgorithms';

const Snippet = () => {
  const {
    selectedAlgorithm,
  } = useSortingContext();

  return (
    <>
      {selectedAlgorithm && (
        <CodeBlock code={sortingAlgorithmsStringRecord[selectedAlgorithm]}  />
      )}
    </>
  )
}

export default Snippet