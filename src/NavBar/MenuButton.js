import React from 'react';

import './NavBar.css';

/**
 * Represents a menu button.
 * 
 * @author Jake Waclawski
 */
class MenuButton extends React.Component {
    constructor (props) {
        super(props);
        // Is the dropdown menu hidden?
        this.state = { dropdownHidden: true };
    }

    /**
     * Renders the menu button.
     * 
     * @returns a <div> element representing the button
     */
    render () {
        return (
            <div className="dropdown dropdown-animate">
                <div className="menu-button" 
                onMouseEnter={() => this.setState({dropdownHidden: false})}
                onClick={() => this.props.clickFunction()}
                onMouseUp={() => this.setState({dropdownHidden: true})}>
                    <span>{this.props.buttonText}</span>
                </div>
                <div className="dropdown-content drop-content dropdown-animate"
                hidden={this.state.pathfindDropdownHidden}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MenuButton;