import React from 'react';

import { Card, CardHeader, CardBody
} from 'reactstrap'

import { random } from '../Utils';
import SortMenu from './SortMenu';

import './SortingVisualizer.css';

const ARRAY_SIZE = 50;
const MIN_VALUE = 5;
const MAX_VALUE = 500;

const UNSORTED = "pink";
const COMPARE = "red";
const SORTED = "green";
const SWAP = "orange";
const MIN = "purple";

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

    selectionSort = () => {
        const array = this.state.array;
        const animations = [];

        for (let i = 0; i < array.length; i++) {
            var min = i;
            for (let k = i + 1; k < array.length; k++) {
                animations.push([[MIN, min], [COMPARE, k]]);
                if (array[min] > array[k]) {
                    animations.push([[UNSORTED, min]]);
                    min = k;
                }
                else animations.push([[UNSORTED, k]]);
            }

            if (min !== i) {
                animations.push([[SWAP, min, i], [null, min, array[i]], [null, i, array[min]]]);
                animations.push([[UNSORTED, min], [SORTED, i]]);
                var temp = array[i];
                array[i] = array[min];
                array[min] = temp;
            } else animations.push([[SORTED, i]]);
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
                            bars[action[k]].style.backgroundColor = action[0]; 
                        }
                    }
                }
            }, 100 * i);
            i++;
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