import { random } from '../Utils';

export function recursiveDevision(rows, cols) {
    var walls = [];

    //walls = innerWalls(walls, true, 0, cols-1, 0, rows-1);
    walls = buildWalls(walls, rows, cols);
    
    return walls;
}

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

function addHWall(walls, minC, maxC, r) {
    var hole = Math.floor(random(minC, maxC)/2)*2+1;
    for (var i = minC; i <= maxC; i++) { if (i !== hole) walls.push([r, i]); }
    return walls;
}

function addVWall(walls, minR, maxR, c) {
    var hole = Math.floor(random(minR, maxR)/2)*2+1;
    for (var i = minR; i <= maxR; i++) { if (i !== hole) walls.push([i, c]); }
    return walls;
}