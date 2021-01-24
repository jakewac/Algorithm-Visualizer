# Algorithm Visualizer Project

Created by Jake Waclawski.
Inspired by Clément Mihailescu's [Pathfinding Visualizer Project](https://github.com/clementmihailescu/Pathfinding-Visualizer).

The project can be accessed here: [jmw3638.github.io/Algorithm-Visualizer](https://jmw3638.github.io/Algorithm-Visualizer/)
Google Chrome is the recommended browser for this project,
it has not been tested on other web browsers.

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Information

### Home

The home page of the project, design is a work-in-progress.

### Pathfinding Visualizer

Generate a maze or draw your own by using the wall and weight node buttons.
Click the wall or weight node buttons, then click and drag on the grid to draw or erase obstacles.
Click the start or target node buttons to place their respective nodes in a new location.
Select a pathfinding algorithm, click pathfind, and watch the algorithm work!

Walls are not traversable by the algorithm, and must be navigated around.
Weights are nodes that have a penalty cost for traversing through. Only weighted
algorithms (Dijkstra, A*) will be able to recognize weight nodes.

### Sorting Visualizer

Choose an array size with the randomize button,
select a sorting algorithm, and click sort!
