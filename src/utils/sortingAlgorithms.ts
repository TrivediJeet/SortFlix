export function generateRandomArray(size: number, min = 5, max = 100): number[] {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomArray;
}

// String representation of each algorithm for use in templates
export const sortingAlgorithmsStringRecord: Record<string, string> = {
    bubbleSort: bubbleSort.toString(),
    mergeSort: mergeSort.toString(),
    quickSort: quickSort.toString(),
};

export function* bubbleSort(arr: number[]): Generator<number[]> {
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

export function* mergeSort(arr: number[]): Generator<number[]> {
    const n = arr.length;

    if (n > 1) {
        const mid = Math.floor(n / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        yield* mergeSort(left);  // Sort left half
        yield* mergeSort(right); // Sort right half

        // Merge the sorted halves
        let i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
            yield [...arr];
        }

        while (i < left.length) {
            arr[k++] = left[i++];
            yield [...arr];
        }

        while (j < right.length) {
            arr[k++] = right[j++];
            yield [...arr];
        }
    }
    yield arr; // yield the final sorted array
}

export function* quickSort(
    arr: number[],
    low: number,
    high: number
): Generator<number[], void, undefined> {
    if (low < high) {
        const pivotIndex = yield* partition(arr, low, high);
        yield* quickSort(arr, low, pivotIndex - 1);
        yield* quickSort(arr, pivotIndex + 1, high);
    }
    yield arr; // Yield the final sorted array
}

function* partition(arr: number[], low: number, high: number): Generator<number[]> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            yield [...arr]; // Yield a copy of the array after each swap
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield [...arr]; // Yield after placing the pivot
    return i + 1;
}