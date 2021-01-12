import React from 'react';

import './Node.css';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const nodeType = this.props.isStart ? 'node-start' : 
        this.props.isTarget ? 'node-target' : 
        this.props.isWall ? 'node-wall' :
        '';

        return (
            <div 
            id={`node-${this.props.row}-${this.props.col}`} 
            className={`node ${nodeType}`}
            onMouseDown={() => this.props.mousePressed(this.props.row, this.props.col, this.props.isWall)}
            onMouseEnter={() => this.props.mouseEntered(this.props.row, this.props.col, this.props.isWall)}
            /> 
        );
    }
}

export default Node;