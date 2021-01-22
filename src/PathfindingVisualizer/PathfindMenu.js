import React from 'react';

import Node from './Node';
import { pathfindAlgorithms } from './PathfindAlgorithms';
import { mazeAlgorithms } from './MazeAlgorithms';

/**
 * Represents the top menu of the pathfinding visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Currently selected pathfinding algorithm
            curAlgorithm: null,
            // Is the maze button dropdown open?
            mazeDropdownHidden: true,
            // Is the clear button dropdown open?
            clearDropdownHidden: true,
            // Is the algorithm button dropdown open?
            algorithmDropdownHidden: true,
            // Is the pathfind button dropdown open?
            pathfindDropdownHidden: true,
        };
    }

    /**
     * Gets the current algorithm for the information text as a string.
     * 
     * @returns the string
     */
    getCurrentAlgorithmText() {
        if (!this.state.curAlgorithm) return "None";
        return this.state.curAlgorithm;
    }

    /**
     * Runs the animation for the pressed node. Sets the appropriate draw mode.
     * 
     * @param {string} id element id
     * @param {string} className class name to set
     * @param {int} drawMode draw mode to set
     */
    keyNodePressed (id, className, drawMode) {
        document.getElementById(`node-${id}`).className = className;
        if (drawMode || drawMode === 0) this.props.pathfinder.setDrawMode(drawMode);
    }

    /**
     * Reverts the node state to the instant version.
     * 
     * @param {string} id node element id
     * @param {string} className class name to set
     */
    keyAnimationEnded (id, className) { document.getElementById(`node-${id}`).className = `node ${className}`; }
    
    /**
     * Renders the menu component.
     * 
     * @returns a <div> element representing the menu
     */
    render () {
        return (
            <div className="pathfind-menu">
                <div className="pv-menu-bar">
                    <div className="pv-title">Pathfinding Visualizer</div>
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
                    <div className="algorithm-dropdown dropdown-animate">
                        <div className="pv-menu-bar-button"
                        onMouseEnter={() => this.setState({algorithmDropdownHidden: false})}
                        onClick={() => this.setState({curAlgorithm: null})}>
                        <span>Algorithm</span></div>
                        <div className="pv-menu-dropdown-content alg-drop-content dropdown-animate"
                        hidden={this.state.algorithmDropdownHidden} 
                        onClick={() => this.setState({algorithmDropdownHidden: true})}>
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
                        </div>
                    </div>
                    <div className="pathfind-dropdown dropdown-animate">
                        <div className="pv-menu-bar-button" 
                        onMouseEnter={() => this.setState({pathfindDropdownHidden: false})}
                        onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm)}>
                        <span>Pathfind</span></div>
                        <div className="pv-menu-dropdown-content pathfind-drop-content dropdown-animate"
                        hidden={this.state.pathfindDropdownHidden}
                        onClick={() => this.setState({pathfindDropdownHidden: true})}>
                            <div className="pv-menu-dropdown-content-item"
                            onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, 250)}
                            >Very Slow</div>
                            <div className="pv-menu-dropdown-content-item"
                            onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, 100)}
                            >Slow</div>
                            <div className="pv-menu-dropdown-content-item"
                            onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, 25)}
                            >Fast</div>
                            <div className="pv-menu-dropdown-content-item"
                            onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, 5)}
                            >Very Fast</div>
                            <div className="pv-menu-dropdown-content-item"
                            onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, 0)}
                            >Instant</div>
                        </div>
                    </div>
                </div>
                <div className="pathfind-key">
                    <div className="key-item" onClick={() => this.keyNodePressed("start-instant", "node start", 3)}>
                        <div className="key-node">
                            <Node type={"start-instant"}
                            row={"start"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div id='start-text' className="key-text">Start Node</div>
                    </div>
                    <div className="key-item" onClick={() => this.keyNodePressed("target-instant", "node target", 4)}>
                        <div className="key-node">
                            <Node type={"target-instant"}
                            row={"target"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-text">Target Node</div>
                    </div>
                    <div className="key-item" onClick={() => this.keyNodePressed("weight-instant", "node weight", 2)}>
                        <div className="key-node">
                            <Node type={"weight-instant"}
                            row={"weight"}
                            col={"instant"}                           
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-text">Weighted Node</div>
                    </div>
                    <div className="key-item" onClick={() => this.keyNodePressed("wall-instant", "node wall", 1)}>
                        <div className="key-node">
                            <Node type={"wall-instant"}
                            row={"wall"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-text">Wall Node</div>
                    </div>
                    <div className="key-item" onClick={() => this.keyNodePressed("unvisited-instant", "node node-animated", 0)}>
                        <div className="key-node">
                            <Node type={"unvisited-instant"}
                            row={"unvisited"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, "node")}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-text">Unvisited Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node" onClick={() => this.keyNodePressed("visited-instant", "node visited")}>
                            <Node type={"visited-instant"}
                            row={"visited"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-node" onClick={() => this.keyNodePressed("visited-weight-instant", "node visited-weight")}>
                            <Node type={"visited-weight-instant"}
                            row={"visited-weight"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>         
                        </div>
                        <div className="key-text">Visited Nodes</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node" onClick={() => this.keyNodePressed("path-instant", "node path")}>
                            <Node type={"path-instant"}
                            row={"path"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-node" onClick={() => this.keyNodePressed("path-weight-instant", "node path-weight")}>
                            <Node type={"path-weight-instant"}
                            row={"path-weight"}
                            col={"instant"}
                            animationEnded={(type) => this.keyAnimationEnded(type, type)}
                            mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null}/>
                        </div>
                        <div className="key-text">Path Nodes</div>
                    </div>
                </div>
                <div className="pathfind-info">
                    <div className="info-item">
                        <div>Algorithm:</div>
                        <div id="algorithm-info-text" className="info-text">{this.getCurrentAlgorithmText()}</div>
                    </div>
                    <div className="info-item">
                        <div>Visited Nodes:</div>
                        <div id="visited-info-text" className="info-text">0</div>
                    </div>
                    <div className="info-item">
                        <div>Path Nodes:</div>
                        <div id="path-info-text" className="info-text">No Path</div>
                    </div>
                    <div className="info-item">
                        <div>Path Cost:</div>
                        <div id="weighted-info-text" className="info-text">0</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PathfindMenu;