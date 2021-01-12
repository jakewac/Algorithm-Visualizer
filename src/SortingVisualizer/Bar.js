import React from 'react';

import './Bar.css';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const height = { height: (this.props.value * 5) };

        return (
            <div
            id={`bar-${this.props.position}`} 
            className="bar"
            style={height}
            />
        );
    }
}

export default Bar;