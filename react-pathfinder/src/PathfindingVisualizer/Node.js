import React from 'react';

import './Node.css';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div id={`node-${this.props.row}-${this.props.col}`} className="node"></div> 
        );
    }
}

export default Node;