import { random } from '../Utils';

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

    walls = innerWalls(walls, true, 1, cols-2, 1, rows-2);
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
    if (h) {
        if (maxC - minC <= 1) { return walls; }

        var r = Math.floor(random(minR, maxR)/2)*2;
        walls = addHWall(walls, minC, maxC, r);

        walls = innerWalls(walls, !h, minC, maxC, minR, r-1);
        walls = innerWalls(walls, !h, minC, maxC, r+1, maxR);
    } else {
        if (maxR - minR <= 1) { return walls; }

        var c = Math.floor(random(minC, maxC)/2)*2;
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
    var hole = Math.floor(random(minC, maxC)/2)*2+1;
    for (var i = minC; i <= maxC; i++) { if (i !== hole) walls.push([r, i]); }
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
    var hole = Math.floor(random(minR, maxR)/2)*2+1;
    for (var i = minR; i <= maxR; i++) { if (i !== hole) walls.push([i, c]); }
    return walls;
}