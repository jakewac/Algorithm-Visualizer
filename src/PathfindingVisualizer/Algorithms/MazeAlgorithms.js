import { random } from '../../utils';

// Maze algorithms
export const mazeAlgorithms = {
    RECURSIVE_DEVISION: "Recursive Devision",
    RANDOM_WALL: "Random Wall",
    RANDOM_WEIGHT: "Random Weight",
    RANDOM_WALL_WEIGHT: "Random Wall/Weight"
}

/**
 * Algorithm for generating a random wall maze.
 * 
 * @param {int} rows number of rows
 * @param {int} cols number of columns
 * 
 * @returns a grid of boolean values, true if wall node
 */
export function randomWallMaze(rows, cols) {
    var walls = []

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const rNum = random(1, 10);
            if (rNum <= 3) walls.push([r, c]);
        }
    }

    return walls;
}

/**
 * Algorithm for generating a random weight maze.
 * 
 * @param {int} rows number of rows
 * @param {int} cols number of columns
 * 
 * @returns a grid of boolean values, true if wall node
 */
export function randomWeightMaze(rows, cols) {
    var walls = []

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const rNum = random(1, 10);
            if (rNum <= 3) walls.push([r, c, true]);
        }
    }

    return walls;
}

/**
 * Algorithm for generating a random wall/weight maze.
 * 
 * @param {int} rows number of rows
 * @param {int} cols number of columns
 * 
 * @returns a grid of boolean values, true if wall node
 */
export function randomWallWeightMaze(rows, cols) {
    var walls = []

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const rNum = random(1, 10);
            if (rNum <= 2) walls.push([r, c]);
            if (rNum >= 8) walls.push([r, c, true]);
        }
    }

    return walls;
}

/**
 * Algorithm for generating a maze using recursive devision.
 * 
 * @param {int} rows number of rows
 * @param {int} cols number of columns
 * 
 * @returns a grid of boolean values, true if wall node
 */
export function recursiveDevision(rows, cols) {
    var walls = [];

    //walls = innerWalls(walls, true, 0, cols-1, 0, rows-1);
    walls = buildWalls(walls, rows, cols);
    
    return walls;
}

/**
 * Creates walls around the border of the maze.
 * 
 * @param {Array} walls grid of walls
 * @param {int} rows amount of rows 
 * @param {int} cols amount of columns
 * 
 * @returns a grid of walls
 */
function buildWalls(walls, rows, cols) {
    for (var r = 0; r < rows; r++) {
        if (r === 0 || r === (rows-1)) {
            for (var c = 0; c < cols; c++) {
                walls.push([r, c]);
            }
        } else {
            walls.push([r, 0]);
            walls.push([r, cols-1]);
        }
    }

    walls = innerWalls(walls, random(0, 1), 1, cols-2, 1, rows-2);
    return walls;
}

/**
 * Recursive function that builds the inner walls of the maze.
 * 
 * @param {Array} walls grid of walls
 * @param {boolean} h is horizontal wall
 * @param {int} minC lower column bound
 * @param {int} maxC upper column bound
 * @param {int} minR lower row bound
 * @param {int} maxR upper row bound
 * 
 * @returns a grid of walls
 */
function innerWalls(walls, h, minC, maxC, minR, maxR) {
    const rGap = maxR - minR;
    const cGap = maxC - minC;

    if (maxR - minR <= 1) return walls; 
    if (maxC - minC <= 1) return walls; 

    var r = Math.floor(random(minR+1, maxR-1)/2)*2;
    var c = Math.floor(random(minC+1, maxC-1)/2)*2;

    // ^ xor: one or the other but not both
    if (rGap <= 5 ^ cGap<= 5) {
        if (rGap <= 5) {
            walls = addVWall(walls, minR, maxR, c);

            walls = innerWalls(walls, !h, minC, c-1, minR, maxR);
            walls = innerWalls(walls, !h, c+1, maxC, minR, maxR);
        }
        if (cGap <= 5) {
            walls = addHWall(walls, minC, maxC, r);
    
            walls = innerWalls(walls, !h, minC, maxC, minR, r-1);
            walls = innerWalls(walls, !h, minC, maxC, r+1, maxR);
        }
        return walls;
    } 
    if (h) {
        walls = addHWall(walls, minC, maxC, r);

        walls = innerWalls(walls, !h, minC, maxC, minR, r-1);
        walls = innerWalls(walls, !h, minC, maxC, r+1, maxR);
    } else {
        walls = addVWall(walls, minR, maxR, c);

        walls = innerWalls(walls, !h, minC, c-1, minR, maxR);
        walls = innerWalls(walls, !h, c+1, maxC, minR, maxR);
    }
    return walls;
}

/**
 * Builds a horizontal wall at a given row.
 * 
 * @param {Array} walls grid of walls
 * @param {int} minC lower column bound
 * @param {int} maxC upper column bound
 * @param {int} r row
 */
function addHWall(walls, minC, maxC, r) {
    const numHoles = random(1, (maxC - minC)/4);
    const holes = [];
    for (let i = 0; i < numHoles; i++) {
        const hole = Math.floor(random(minC, maxC)/2)*2+1;
        holes.push(hole);
    }

    for (var i = minC; i <= maxC; i++) if (!holes.includes(i)) walls.push([r, i]); 
    return walls;
}

/**
 * Builds a vertical wall at a given column.
 * 
 * @param {Array} walls grid of walls
 * @param {int} minR lower row bound
 * @param {int} maxR upper row bound
 * @param {int} c column 
 */
function addVWall(walls, minR, maxR, c) {
    const numHoles = random(1, (maxR - minR)/4);
    const holes = [];
    for (let i = 0; i < numHoles; i++) {
        const hole = Math.floor(random(minR, maxR)/2)*2+1;
        holes.push(hole);
    }

    for (var i = minR; i <= maxR; i++) if (!holes.includes(i)) walls.push([i, c]); 
    return walls;
}