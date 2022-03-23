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
    let pivotIndex = randomIntFromInterval(startIndex, endIndex);

    animations.push(["comparison1", pivotIndex, endIndex]);
    animations.push(["swap", pivotIndex, auxiliaryArray[endIndex]]);
    animations.push(["swap", endIndex, auxiliaryArray[pivotIndex]]);
    animations.push(["comparison2", pivotIndex, endIndex]);
    swap(auxiliaryArray, pivotIndex, endIndex);

    let lessTailIndex = startIndex;

    for (let i = startIndex; i < endIndex; i++) {
        animations.push(["comparison1", i, endIndex]);
        animations.push(["comparison2", i, endIndex]);
        if (auxiliaryArray[i] <= auxiliaryArray[endIndex]) {
            animations.push(["comparison1", i, lessTailIndex]);
            animations.push(["swap", i, auxiliaryArray[lessTailIndex]]);
            animations.push(["swap", lessTailIndex,auxiliaryArray[i]]);
            animations.push(["comparison2", i, lessTailIndex]);
            swap(auxiliaryArray, i , lessTailIndex);
            lessTailIndex++;
        }
    }
    animations.push(["comparison1", lessTailIndex, endIndex]);
    animations.push(["swap", endIndex, auxiliaryArray[lessTailIndex]]);
    animations.push(["swap", lessTailIndex, auxiliaryArray[endIndex]]);
    animations.push(["comparison2", lessTailIndex, endIndex]);

    swap(auxiliaryArray, lessTailIndex, endIndex);
    return lessTailIndex;
}

function swap(auxiliaryArray, firstIndex, secondIndex) {
    let temp = auxiliaryArray[firstIndex];
    auxiliaryArray[firstIndex] = auxiliaryArray[secondIndex];
    auxiliaryArray[secondIndex] = temp;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

animations.push()