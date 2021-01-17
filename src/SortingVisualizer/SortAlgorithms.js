// Unsorted bar color
const UNSORTED = "pink";
// Comparing bar color
const COMPARE = "red";
// Sorted bar color
const SORTED = "green";
// Swapping bar color
const SWAP = "orange";
// Minimum bar color
const MIN = "purple";

// Sorting algorithms
export const sortAlgorithms = {
    SELECTION: "selection",
    INSERTION: "insertion",
    MERGE: "merge",
}

/**
 * Executes a Selection Sort on an array.
 * 
 * @param {Array} array array of values
 * 
 * @returns an array of animations
 */
export function selectionSort(array) {
    const animations = [];

    for (let i = 0; i < array.length; i++) {
        var min = i;
        animations.push([[MIN, min]]);
        var newMin = true;
        for (let k = i + 1; k < array.length; k++) {
            if (newMin) {
                animations.push([[COMPARE, k]]);
                newMin = false;
            } else animations.push([[UNSORTED, k-1], [COMPARE, k]]);
            
            if (array[min] > array[k]) {
                animations.push([[UNSORTED, min], [MIN, k]]);
                min = k;
                newMin = true;
            }
        }
        if (min !== i) {
            animations.push([[UNSORTED, array.length-1], [SWAP, min, i], [null, min, array[i]], [null, i, array[min]]]);
            animations.push([[UNSORTED, min], [SORTED, i]]);
            var temp = array[i];
            array[i] = array[min];
            array[min] = temp;
        } else animations.push([[UNSORTED, array.length-1], [SORTED, i]]);
    }

    return animations;
}

/**
 * Executes a Insertion Sort on an array.
 * 
 * @param {Array} array array of values
 * 
 * @returns an array of animations
 */
export function insertionSort(array) {
    const animations = [];

    for (let i = 1; i < array.length; i++) {
        var cur = array[i];
        var j = i - 1;
        
        animations.push([[COMPARE, j, i]]);
        while (j >= 0) {
            if (j + 2 >= array.length) animations.push([[COMPARE, j, j + 1]]);
            else animations.push([[UNSORTED, j + 2], [COMPARE, j, j + 1]]);
            if (array[j] <= cur) {
                animations.push([[UNSORTED, j, j + 1]]);
                break;
            }
            animations.push([[SWAP, j, j + 1], [null, j + 1, array[j]], [null, j, cur]]);
            array[j + 1] = array[j];
            j--;
        }
        if (j + 2 >= array.length) animations.push([[UNSORTED, j + 1]]);
        else animations.push([[UNSORTED, j + 1, j + 2]]);
        animations.push([[null, j + 1, cur]]);
        array[j+1] = cur;
    }
    for (let i = array.length - 1; i >= 0; i--) animations.push([[SORTED, i]]);

    return animations;
}

/**
 * Executes a Merge Sort on an array.
 * 
 * @param {Array} array array of values
 * 
 * @returns an array of animations
 */
export function mergeSort(array) {
    const animations = [];
    array = doMergeSort(animations, array);
    return animations;
}

/**
 * Actual recursive Merge Sort function.
 * 
 * @param {Array} animations array of animations
 * @param {Array} array array of values 
 * 
 * @returns sorted array
 */
function doMergeSort(animations, array) {
    const middle = array.length / 2;
    if (array.length < 2) return array;
    const left = array.splice(0, middle);
    return merge(animations, doMergeSort(animations, left), doMergeSort(animations, array));
}

/**
 * Merge Sort helper function.
 * 
 * @param {Array} animations array of animations
 * @param {Array} left left array
 * @param {Array} right right array
 * 
 * @returns merged array
 */
function merge (animations, left, right) {
    var array = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) array.push(left.shift());
        else array.push(right.shift());
    }
    return [...array, ...left, ...right];
}