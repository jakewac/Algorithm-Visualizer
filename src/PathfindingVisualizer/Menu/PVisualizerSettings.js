import React from 'react';

import { pathfindAlgorithms } from '../Algorithms/PathfindAlgorithms';
import { mazeAlgorithms } from '../Algorithms/MazeAlgorithms';

/**
 * Represents the settings bar in the menu of the pathfinding visualizer
 * component.
 * 
 * @author Jake Waclawski
 */
class PVisualizerSettings extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Currently selected pathfinding algorithm
            curAlgorithm: null,
            // Is the maze button dropdown open?
            mazeDropdownHidden: true,
            // Is the clear button dropdown open?
            clearDropdownHidden: true,
            // Is the edit button dropdown open?
            editDropdownHidden: true,
            // Is the algorithm button dropdown open?
            algorithmDropdownHidden: true,
            // Is the pathfind button dropdown open?
            pathfindDropdownHidden: true,

            diagonalNeighbors: false,
        };
    }

    /**
     * Gets the current algorithm for the information text as a string.
     * 
     * @returns the string
     */
    getCurrentAlgorithmText () {
        if (!this.state.curAlgorithm) return "Select an Algorithm";
        return this.state.curAlgorithm;
    }

    changeDiagonalMovement () {
        document.getElementById("diagmove-bool").style.backgroundColor = !this.state.diagonalNeighbors ? "rgb(100, 255, 100)" : "rgb(255, 100, 100)";

        this.setState({diagonalNeighbors: !this.state.diagonalNeighbors});
    }

    changeWeightCost () {
        let cost = parseInt(document.getElementById("ns-weightcost").value);
        if (!cost) cost = 15;

        this.props.pathfinder.setNewWeight(cost);
    }

    /**
     * Renders the settings bar component.
     * 
     * @returns a <div> element representing the settings bar
     */
    render () {

        return (
            <div className="pv-menu-bar">
                <div className="maze-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({mazeDropdownHidden: false})}>
                    <span>Maze</span></div>
                    <div className="pv-menu-dropdown-content maze-drop-content dropdown-animate"
                    hidden={this.state.mazeDropdownHidden}
                    onClick={() => this.setState({mazeDropdownHidden: true})}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RECURSIVE_DEVISION)}
                        >Recursive Devision</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL)}
                        >Random Wall</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WEIGHT)}
                        >Random Weight</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL_WEIGHT)}
                        >Random Wall/Weight</div>
                    </div>
                </div>
                <div className="clear-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onClick={() => this.props.pathfinder.clearGrid()}
                    onMouseEnter={() => this.setState({clearDropdownHidden: false})}>
                    <span>Clear</span></div>
                    <div className="pv-menu-dropdown-content clear-drop-content dropdown-animate"
                    hidden={this.state.clearDropdownHidden} 
                    onClick={() => this.setState({clearDropdownHidden: true})}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearWalls()}
                        >Clear Walls</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearWeights()}
                        >Clear Weights</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearPaths()}
                        >Clear Path</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.resetStartTarget()}
                        >Reset Start/Target</div>
                    </div>
                </div>
                <div className="edit-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({editDropdownHidden: false})}>
                    <span>Edit</span></div>
                    <div className="pv-menu-dropdown-content edit-drop-content dropdown-animate"
                    hidden={this.state.editDropdownHidden} >
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeDiagonalMovement()}>
                            <div id="diagmove-bool" className="bool-setting" />
                            Diagonal Movement</div>
                        <div className="pv-menu-dropdown-content-item">
                            <input id="ns-dmultiplier" className="number-setting" placeholder="A* Multiplier" type="number" />
                        </div>
                        <div className="pv-menu-dropdown-content-item">
                            <input id="ns-weightcost" className="number-setting" onChange={() => this.changeWeightCost()} placeholder="Weight Cost" type="number" />
                        </div>
                    </div>
                </div>
                <div className="algorithm-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button"
                    onMouseEnter={() => this.setState({algorithmDropdownHidden: false})}
                    onClick={() => this.setState({curAlgorithm: null})}>
                    <span>Algorithm</span></div>
                    <div className="pv-menu-dropdown-content alg-drop-content dropdown-animate"
                    hidden={this.state.algorithmDropdownHidden}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DIJKSTRA})}
                        >Dijkstra</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.ASTAR})}
                        >A* (A-Star)</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.BFS})}
                        >Breadth First Search</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DFS})}
                        >Depth First Search</div>
                        {/* <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DEV})}
                        >Development Algorithm</div> */}
                    </div>
                </div>
                <div className="pathfind-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({pathfindDropdownHidden: false})}
                    onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors)}>
                    <span>Pathfind</span></div>
                    <div className="pv-menu-dropdown-content pathfind-drop-content dropdown-animate"
                    hidden={this.state.pathfindDropdownHidden}
                    onClick={() => this.setState({pathfindDropdownHidden: true})}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, 250)}
                        >Very Slow</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, 50)}
                        >Slow</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, 15)}
                        >Fast</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, 5)}
                        >Very Fast</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, 0)}
                        >Instant</div>
                    </div>
                </div>
                <div className="pv-curalg dropdown-animate">{this.getCurrentAlgorithmText()}</div>
            </div>
        );
    }
}

export default PVisualizerSettings;