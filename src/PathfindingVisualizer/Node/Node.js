import React from 'react';

import './Node.css';

/**
 * Represents a grid node on the screen. Extra class names
 * can be applied to change the appearance of the node.
 * 
 * @author Jake Waclawski
 */
class Node extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the node.
     * 
     * @returns a <div> element representing the node
     */
    render () {
        const nodeType = this.props.type ? this.props.type :
        this.props.isStart ? 'start' : 
        this.props.isTarget ? 'target' : 
        '';

        const costText = this.props.cost === 1 ? '' : this.props.cost;

        return (
            <div 
            id={`node-${this.props.row}-${this.props.col}`} 
            className={`node ${nodeType}`}
            onMouseDown={() => this.props.mousePressed(this.props.row, this.props.col)}
            onMouseEnter={() => this.props.mouseEntered(this.props.row, this.props.col)}
            onMouseLeave={() => this.props.mouseLeft(this.props.row, this.props.col)}
            onAnimationEnd={() => this.props.animationEnded(nodeType)}
            >{costText}</div> 
        );
    }
}

export default Node;