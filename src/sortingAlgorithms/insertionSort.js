export function getInsertionSortAnimations(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    insertionSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return [animations, array];
}

function insertionSort(auxiliaryArray, animations) {
    let n = auxiliaryArray.length;

    for (let i = 1; i < n; i++) {
        let key = auxiliaryArray[i];
        let j = i - 1;

        animations.push(['comparison1', i, j]);
        animations.push(['comparison2', i, j]);
        while (j >= 0 && auxiliaryArray[j] > key) {
            animations.push(['overwrite', j+1, auxiliaryArray[j]]);
            auxiliaryArray[j + 1] = auxiliaryArray[j];
            j = j - 1;

            /* Used to visualize which two array bars are being compared before they get shifted*/
            if (j >= 0) {
                animations.push(['comparison1', i, j]);
                animations.push(['comparison2', i, j]);
            }
        }
        animations.push(['overwrite', j + 1, key]);
        auxiliaryArray[j + 1] = key;
    }
}