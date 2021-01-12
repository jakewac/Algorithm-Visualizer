import React from 'react';

import { Card, CardHeader, CardBody
} from 'reactstrap'

import Bar from './Bar';

import { random } from '../Utils';
import SortMenu from './SortMenu';

const ARRAY_SIZE = 100;
const MAX_VALUE = 100;

const barTypes = {
    BAR: "bar",
    COMPARE: "bar bar-compare",
    SORTED: "bar bar-sorted",
    MINIMUM: "bar bar-minimum",
};

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    rebuildArray = (size, max) => {
        const array = [];
        for (let i = 0; i < size; i++) { array.push(this.createBar(i, max)); }
        return array;
    }

    createBar = (pos, max) => {
        const value = random(1, max);
        return {
            position: pos,
            value: value,
        }
    }

    reGenerateArray = () => { 
        var array = this.state.array;
        array = this.rebuildArray(ARRAY_SIZE, MAX_VALUE);
        for (let i = 0; i < array.length; i++) { document.getElementById(`bar-${array[i].position}`).className = 'bar'; }
        this.setState({array: array}); 
    }

    selectionSort = () => {
        const array = this.state.array;
        const updateQ = [];

        for (let i = 0; i < array.length; i++) {
            setTimeout(() => {
                var min = i;
                for (let k = i + 1; k < array.length; k++) {
                    updateQ.push([barTypes.COMPARE, [array[min].position, array[min]], [array[k].position, array[k]]]);
                    if (array[min].value > array[k].value) min = k;
                    updateQ.push([barTypes.BAR, [array[k].position, array[k]]]);
                }
                updateQ.push([barTypes.MINIMUM, [array[min].position, array[min]]]);

                if (min !== i) {
                    updateQ.push([barTypes.COMPARE, [array[i].position, array[i]]]);
                    
                    var temp = array[i];
                    array[min].position = i;
                    array[i] = array[min];
                    temp.position = min;
                    array[min] = temp;
                }

                updateQ.push([barTypes.SORTED, [array[i].position, array[i]]]);
                if (min <= i) updateQ.push([barTypes.SORTED, [array[min].position, array[min]]]);
                else updateQ.push([barTypes.BAR, [array[min].position, array[min]]]);
            }, 1000 * i);
        }
        console.log(updateQ)
        this.animateSort(updateQ);
    }

    animateSort = (updateQ) => {
        var i = 0
        for (const element of updateQ) {
            setTimeout(() => {
                for (let i = 0; i < element.length; i++) {
                    if (i !== 0) document.getElementById(`bar-${this.state.array[i].position}`).className = element[0];
                }
            }, 100 * i);
            i++;
        }
    }

    componentDidMount () {
        const array = this.rebuildArray(ARRAY_SIZE, MAX_VALUE);
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
                                const {position, value} = bar;
                                return (
                                    <Bar
                                    key={barIdx}
                                    position={position}
                                    value={value}
                                    />
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