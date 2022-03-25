import React from 'react';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort';
import './SortingVisualizer.css';

const WINDOW_HEIGHT = window.innerHeight;
const NUMBER_OF_ARRAY_BARS = 100;

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            disabled: false,
            currentSortType: '',
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        this.setState({currentSortType: ''});
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, WINDOW_HEIGHT - 250));
        }
        this.setState({array});
    }

    /* Animations pass through instructions for how to animate the array bars. "Comparison1" will turn the array
       to the secondary color to signal that it's being compared. "Comparison2" will revert the color to normal
       once it's done being compared. Overwrite / Swap will change the array bars height for sorting */

    mergeSort() {
        this.setState({disabled: true, currentSortType: 'Currently running Merge Sort...'});
        const [animations, sortedArray] = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChange === true) {
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR);
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [overwrite, barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
            this.setState({disabled: false});
        }, 100 * 170);
    }

    quickSort() {
        this.setState({disabled: true, currentSortType: 'Currently running Quick Sort...'});
        const [animations,sortArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        setTimeout(() => {
            this.setState({disabled: false});
        }, 100 * 140);
    }

    insertionSort() {
        this.setState({disabled: true, currentSortType: 'Currently running Insertion Sort...'});
        const [animations] = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');

            if (isColorChange === true) {
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR);
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [overwrite, barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
            this.setState({disabled: false});
        }, 100 * 375);
    }
    
    bubbleSort() {
        this.setState({disabled: true, currentSortType: 'Currently running Bubble Sort...'});
        const [animations] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
            this.setState({disabled: false});
        }, 100 * 750);
    }

    render() {
        const {array} = this.state;

        return (
            <div>
                <p>{this.state.currentSortType}</p>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar" 
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                                }}></div>
                    ))}
                    <div className="button-container">
                        <button className="button-style-main" onClick={() => this.resetArray()} disabled={this.state.disabled}>Generate New Array</button>
                        <button className="button-style" onClick={() => this.mergeSort()} disabled={this.state.disabled}>Merge Sort</button>
                        <button className="button-style" onClick={() => this.quickSort()} disabled={this.state.disabled}>Quick Sort</button>
                        <button className="button-style" onClick={() => this.insertionSort()} disabled={this.state.disabled}>Insertion Sort</button>
                        <button className="button-style" onClick={() => this.bubbleSort()} disabled={this.state.disabled}>Bubble Sort</button>
                    </div>
                </div>
            </div>
        );
    }
}

/* Helper function used to generate values for the array */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}