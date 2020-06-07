"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UPGMAElement {
    constructor(...tags) {
        this.tags = [];
        tags.forEach((item, index) => {
            if (item !== '' && this.tags.indexOf(item) === -1) {
                this.tags.push(item);
            }
        });
    }
}
exports.UPGMAElement = UPGMAElement;
class UPGMACluster {
    constructor(...elements) {
        this.elements = [];
        this.elements.push(...elements);
    }
    static getMinFromMatrix(matrixDistance) {
        // find out minimalPoint
        let min, minimalPoint = [0, 0];
        traverse(matrixDistance, (i, j) => {
            const item = matrixDistance[i][j];
            if (!min || item < min) {
                min = item;
                minimalPoint = [i, j];
            }
        });
        return minimalPoint;
    }
    static formNewMatrixFrom(matrixDistance, minimalPoint) {
        //form new matrix
        let newLine = [0];
        newLine.id = minimalPoint.map(item => matrixDistance[item].id);
        let matrixGrouped = [newLine];
        for (var line = 0; line < matrixDistance.length; line++) {
            if (minimalPoint.indexOf(line) !== -1) {
                continue;
            }
            let averageDistanceBetweenGroupAndItem = 0;
            minimalPoint.forEach(idxGrouped => {
                averageDistanceBetweenGroupAndItem += matrixDistance[line][idxGrouped] / minimalPoint.length;
            });
            matrixGrouped[0].push(averageDistanceBetweenGroupAndItem);
            let newLine = [averageDistanceBetweenGroupAndItem];
            //cut one line and one col;
            let restInThisLine = matrixDistance.slice(line, line + 1)[0];
            for (var i = 0; i < restInThisLine.length; i++) {
                if (minimalPoint.indexOf(i) === -1) {
                    newLine.push(restInThisLine[i]);
                }
            }
            newLine.id = matrixDistance[line].id;
            matrixGrouped.push(newLine);
        }
        return matrixGrouped;
    }
    generate() {
        let matrixDistance = this.elements.map((el, index) => {
            let ret = this.elements.map(elCompare => {
                return compareStringArray(el.tags, elCompare.tags);
            });
            ret.id = index;
            return ret;
        });
        let _genMatrix = matrixDistance;
        console.log(_genMatrix);
        do {
            let minimalPoint = UPGMACluster.getMinFromMatrix(_genMatrix);
            _genMatrix = UPGMACluster.formNewMatrixFrom(_genMatrix, minimalPoint);
            //_genMatrix is [minPoints, ...rest]
        } while (_genMatrix.length > 2);
        return _genMatrix;
    }
}
exports.UPGMACluster = UPGMACluster;
function traverse(matrix, fn) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = i + 1; j < matrix[i].length; j++) {
            fn(i, j);
        }
    }
}
function compareStringArray(arr1, arr2) {
    let ret = 0;
    arr1.forEach(item => {
        if (arr2.indexOf(item) === -1) {
            ret++;
        }
    });
    arr2.forEach(item => {
        if (arr1.indexOf(item) === -1) {
            ret++;
        }
    });
    return ret;
}
//# sourceMappingURL=index.js.map