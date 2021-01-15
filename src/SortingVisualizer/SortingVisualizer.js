import React from 'react';

import { Card, CardHeader, CardBody
} from 'reactstrap'

import { random } from '../Utils';
import SortMenu from './SortMenu';
import { selectionSort, insertionSort, mergeSort, sortAlgorithms } from './SortAlgorithms';

import './SortingVisualizer.css';

const ARRAY_SIZE = 50;
const MIN_VALUE = 5;
const MAX_VALUE = 500;
const SPEED = 100;

const UNSORTED = "pink";

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    rebuildArray = (size, min, max) => {
        const array = [];
        for (let i = 0; i < size; i++) { array.push(this.createBar(min, max)); }
        return array;
    }

    createBar = (min, max) => {
        const value = random(min, max);
        return value;
    }

    reGenerateArray = () => { 
        var array = this.state.array;
        array = this.rebuildArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < array.length; i++) { bars[i].style.backgroundColor = UNSORTED; }
        this.setState({array: array}); 
    }

    visualizeSort = (algorithm) => {
        const array = this.state.array;
        var animations = [];

        switch (algorithm) {
            case sortAlgorithms.SELECTION:
                animations = selectionSort(array);
                break;
            case sortAlgorithms.INSERTION:
                animations = insertionSort(array);
                break;
            case sortAlgorithms.MERGE:
                animations = mergeSort(array);
                break;
            default:
                break;
        }

        this.animateSort(animations);
    }

    animateSort = (animations) => {
        const bars = document.getElementsByClassName("bar");
        var i = 0
        for (const step of animations) {
            setTimeout(() => {
                for (const action of step) { 
                    if (action[0] === null) {
                        bars[action[1]].style.height = `${action[2]}px`;
                    } else {
                        for (let k = 1; k < action.length; k++) {
                            console.log(action);
                            bars[action[k]].style.backgroundColor = action[0]; 
                        }
                    }
                }
            }, SPEED * i++);
        }
    }

    componentDidMount () {
        const array = this.rebuildArray(ARRAY_SIZE, MIN_VALUE, MAX_VALUE);
        this.setState({array: array});
    }

    render () {
        console.log(this.state.array);

        return (
            <div>
                <Card>
                    <CardHeader>
                        <SortMenu sorter={this}/>
                    </CardHeader>
                    <CardBody>
                        <div className="bar-array">
                            {Array.from(this.state.array).map((bar, barIdx) => {
                                return (
                                    <div className="bar"
                                    key={barIdx}
                                    style={{
                                      backgroundColor: UNSORTED,
                                      height: `${bar}px`,
                                    }}/>
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default SortingVisualizer;