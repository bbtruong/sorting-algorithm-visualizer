export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    // Comparing the values from the left side to the right side of the auxiliary
    // array, putting them into the mainArray in non-descending order.
    while (i <= middleIdx && j <= endIdx) {
        // The values being compared are pushed twice, once to change their color,
        // and a second time to revert their color.
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwriting the value k in the original array with the value at
            // index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwriting the value k in the original array with the value at
            // index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    // Copying remaining elements from the left auxiliary array, if any.
    while (i <= middleIdx) {
        // The values being compared are pushed twice, once to change their color,
        // and a second time to revert their color.
        animations.push([i, i]);
        animations.push([i, i]);
        // Overwriting the value k in the original array with the value at
        // index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    // Copying remaining elements from the right auxiliary array, if any.
    while (j <= endIdx) {
        // The values being compared are pushed twice, once to change their color,
        // and a second time to revert their color.
        animations.push([j, j]);
        animations.push([j, j]);
        // Overwriting the value k in the original array with the value at
        // index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}