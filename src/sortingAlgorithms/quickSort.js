export function getQuickSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    quickSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function quickSort(auxiliaryArray, startIndex, endIndex, animations) {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxiliaryArray, startIndex, endIndex, animations);
        quickSort(auxiliaryArray, startIndex, pivotIndex - 1, animations);
        quickSort(auxiliaryArray, pivotIndex + 1, endIndex, animations);
    }
}

function partitionArray(auxiliaryArray, startIndex, endIndex, animations) {
    let pivotIndex = auxiliaryArray[endIndex];
    let lowIndex = startIndex;
    for (let i = startIndex; i < endIndex; i++) {
        animations.push(["comparison1", i, endIndex]);
        animations.push(["comparison2", i, endIndex]);
        if (auxiliaryArray[i] <= pivotIndex) {
            animations.push(["comparison1", i, lowIndex]);
            animations.push(["swap", i, auxiliaryArray[lowIndex]]);
            animations.push(["swap", lowIndex, auxiliaryArray[i]]);
            animations.push(["comparison2", i, lowIndex]);
            swap(auxiliaryArray, i, lowIndex);
            lowIndex++;
        }
    }
    animations.push(["comparison1", lowIndex, endIndex]);
    animations.push(["swap", endIndex, auxiliaryArray[lowIndex]]);
    animations.push(["swap", lowIndex, auxiliaryArray[endIndex]]);
    animations.push(["comparison2", lowIndex, endIndex]);
    swap(auxiliaryArray, lowIndex, endIndex);
    return lowIndex;
}

function swap(auxiliaryArray, firstIndex, secondIndex) {
    let temp = auxiliaryArray[firstIndex];
    auxiliaryArray[firstIndex] = auxiliaryArray[secondIndex];
    auxiliaryArray[secondIndex] = temp;
}