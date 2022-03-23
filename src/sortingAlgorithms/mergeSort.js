export function getMergeSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    mergeSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    array = auxiliaryArray;
    return [animations, array];
}

/* Traditionally, mergeSort creates new arrays for each half of the partitioning. However, for
   the sake of simplicity in animations, only one array, sortedArray, is used. With this approach,
   the array is split up using pointers during partitioning */

/* This mergeSort method takes the last value to be the pivot for each recursive call */
function mergeSort(auxiliaryArray, startIndex, endIndex, animations) {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSort(auxiliaryArray, startIndex, middleIndex, animations);
    mergeSort(auxiliaryArray, middleIndex + 1, endIndex, animations);
    merge(auxiliaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxiliaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortedArray = [];
    let i = startIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIndex) {
        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            sortedArray.push(auxiliaryArray[i++]);
        } else {
            sortedArray.push(auxiliaryArray[j++]);
        }
    }

    while (i <= middleIndex) {
        animations.push(["comparison1", i, i]);
        animations.push(["comparison2", i, i]);
        sortedArray.push(auxiliaryArray[i++]);
    }

    while (j <= endIndex) {
        animations.push(["comparison1", j, j]);
        animations.push(["comparison2", j, j]);
        sortedArray.push(auxiliaryArray[j++]);
    }

    for (let i = startIndex; i <= endIndex; i++) {
        animations.push(["comparison1", i, i - startIndex]);
        animations.push(["overwrite", i, sortedArray[i - startIndex]]);
        animations.push(["comparison2", i, i - startIndex]);
        auxiliaryArray[i] = sortedArray[i - startIndex];
    }
}