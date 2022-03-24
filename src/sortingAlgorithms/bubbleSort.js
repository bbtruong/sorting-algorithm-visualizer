export function getBubbleSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function bubbleSort(auxiliaryArray, animations) {
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
        for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
            animations.push(['comparison1', j, j + 1]);
            animations.push(['comparison2', j, j + 1]);
            if (auxiliaryArray[j + 1] < auxiliaryArray[j]) {
                animations.push(['swap', j, auxiliaryArray[j + 1]]);
                animations.push(['swap', j + 1, auxiliaryArray[j]]);
                swap(auxiliaryArray, j, j + 1);
            }
        }
    }
}

function swap(auxiliaryArray, firstIndex, secondIndex) {
    let temp = auxiliaryArray[firstIndex];
    auxiliaryArray[firstIndex] = auxiliaryArray[secondIndex];
    auxiliaryArray[secondIndex] = temp;
}