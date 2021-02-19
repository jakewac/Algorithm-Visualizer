import React from 'react';

import Node from '../Node/Node';

/**
 * Represents the node key in the menu.
 * 
 * @author Jake Waclawski
 */
class NodeKey extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Gets the current weigth cost.
     * 
     * @returns the weight cost
     */
    getWeightCostText () {
        let element = document.getElementById("ns-weightcost");
        if (element === null || (!element.value && element.value !== 0)) return "5";
        return element.value;
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
     * Renders the key component.
     * 
     * @returns a <div> element representing the key
     */
    render () {

        return (
            <div className="pv-key">
                <div className="pv-key-item" onClick={() => this.keyNodePressed("start-instant", "node start", 3)}>
                    <div className="pv-key-node">
                        <Node type={"start-instant"}
                        row={"start"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div id='start-text' className="pv-key-text">Start Node</div>
                </div>
                <div className="pv-key-item" onClick={() => this.keyNodePressed("target-instant", "node target", 4)}>
                    <div className="pv-key-node">
                        <Node type={"target-instant"}
                        row={"target"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-text">Target Node</div>
                </div>
                <div className="pv-key-item" onClick={() => this.keyNodePressed("weight-instant", "node weight", 2)}>
                    <div className="pv-key-node">
                        <Node type={"weight-instant"}
                        row={"weight"}
                        col={"instant"}             
                        cost={this.getWeightCostText()}              
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-text">Weighted Node</div>
                </div>
                <div className="pv-key-item" onClick={() => this.keyNodePressed("wall-instant", "node wall", 1)}>
                    <div className="pv-key-node">
                        <Node type={"wall-instant"}
                        row={"wall"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-text">Wall Node</div>
                </div>
                <div className="pv-key-item" onClick={() => this.keyNodePressed("unvisited-instant", "node node-animated", 0)}>
                    <div className="pv-key-node">
                        <Node type={"unvisited-instant"}
                        row={"unvisited"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, "node")}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-text">Unvisited Node</div>
                </div>
                <div className="pv-key-item">
                    <div className="pv-key-node" onClick={() => this.keyNodePressed("visited-instant", "node visited")}>
                        <Node type={"visited-instant"}
                        row={"visited"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-node" onClick={() => this.keyNodePressed("visited-weight-instant", "node visited-weight")}>
                        <Node type={"visited-weight-instant"}
                        row={"visited-weight"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />         
                    </div>
                    <div className="pv-key-text">Visited Nodes</div>
                </div>
                <div className="pv-key-item">
                    <div className="pv-key-node" onClick={() => this.keyNodePressed("path-instant", "node path")}>
                        <Node type={"path-instant"}
                        row={"path"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-node" onClick={() => this.keyNodePressed("path-weight-instant", "node path-weight")}>
                        <Node type={"path-weight-instant"}
                        row={"path-weight"}
                        col={"instant"}
                        animationEnded={(type) => this.keyAnimationEnded(type, type)}
                        mousePressed={() => null} mouseEntered={() => null} mouseLeft={() => null} />
                    </div>
                    <div className="pv-key-text">Path Nodes</div>
                </div>
            </div>
        );
    }
}

export default NodeKey;