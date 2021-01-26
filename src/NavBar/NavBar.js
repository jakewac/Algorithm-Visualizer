import React from 'react';

import './NavBar.css';

import Home from '../Home/Home';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer';

// Default tab to display on page load
const DEFAULT_TAB = "Home";

/**
 * Represents the navigation bar at the top of the page. Each tab
 * contains one component of the project.
 * 
 * @author Jake Waclawski
 */
class NavBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            navigateDropdownHidden: true,
            curTab: DEFAULT_TAB,
        };
    }

    /**
     * Changes the currently displayed tab.
     * 
     * @param {string} tab tab to change to
     */
    changeTab (tab) {
        const elements = document.getElementsByClassName("tab-content");
        for (let i = 0; i < elements.length; i++) elements[i].style.display = "none";
        document.getElementById(tab).style.display = "block";
        this.setState({curTab: tab});
    }

    /**
     * Runs on page load. Sets the current active tab.
     */
    componentDidMount () { document.getElementById(DEFAULT_TAB).style.display = "block"; }

    /**
     * Renders the navigation bar.
     * 
     * @returns a <div> element representing the navigation bar
     */
    render () {
        return (
            <div>
                <div className="topmenu">
                    <div className="topmenu-curtab" 
                    onMouseEnter={() => this.setState({navigateDropdownHidden: false})}>
                    <span>{this.state.curTab}</span>
                        <div className="topmenu-tablist topmenu-tablist-animate"
                        hidden={this.state.navigateDropdownHidden}>
                            <div className="topmenu-tab"
                            onClick={() => this.changeTab("Home")}
                            >Home</div>
                            <div className="topmenu-tab"
                            onClick={() => this.changeTab("Pathfinding Visualizer")}
                            >Pathfinding Visualizer</div>
                            <div className="topmenu-tab"
                            onClick={() => this.changeTab("Sorting Visualizer")}
                            >Sorting Visualizer</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="Home" className="tab-content">
                        <Home changeTab={(tab) => this.changeTab(tab)}/>
                    </div>
                    <div id="Pathfinding Visualizer" className="tab-content">
                        <PathfindingVisualizer />
                    </div>
                    <div id="Sorting Visualizer" className="tab-content">
                        <SortingVisualizer />
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;