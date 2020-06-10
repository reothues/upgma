import { UPGMAElement } from './UPGMAElement';

type IdLineOfMatrixDistance = number | IdLineOfMatrixDistance[];

type LineOfMatrixDistance = number[] & {id: IdLineOfMatrixDistance}

type MatrixDistance = LineOfMatrixDistance[];

function traverse(matrix: number[][], fn: (i: number, j: number, distance: number) => void) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      fn(i, j, matrix[i][j]);
    }
  }
}

/**
 * 计算两个元素 tags 差异
 * @param element1
 * @param element2
 */
function computeElementDistance(element1: UPGMAElement, element2: UPGMAElement) : number {
  const tags1 = element1.tags;
  const tags2 = element2.tags;

  // 当前采用两个 elm tags 不同个数表示距离
  const total = tags1.length + tags2.length;
  const unionSize = (new Set([...tags1, ...tags2])).size;
  const insectionSize = total - unionSize;
  const distance = unionSize - insectionSize;
  return distance;
}

export class UPGMACluster {
  elements: UPGMAElement[] = [];
  constructor (...elements) {
    this.elements.push(...elements);
  }

  private static getMinFromMatrix(matrixDistance: MatrixDistance) {
    // find out minimalPoint
    let min = Number.MAX_SAFE_INTEGER, minimalPoint = [0, 0];
    traverse(matrixDistance, (i, j, distance) => {
      if (distance < min) {
        min = distance;
        minimalPoint = [i, j];
      }
    });
    console.log(minimalPoint);
    return minimalPoint;
  }

  private static formNewMatrixFrom(matrixDistance: MatrixDistance, minimalPoint: [number, number]) : MatrixDistance{
    //form new matrix
    let newLine: LineOfMatrixDistance = [] as LineOfMatrixDistance;
    newLine.id = minimalPoint.map(item => matrixDistance[item].id);
    let matrixGrouped: MatrixDistance = [newLine];

    for (let line = 0; line < matrixDistance.length; line ++) {
      if (minimalPoint.indexOf(line) !== -1) {
        continue;
      }
      let averageDistanceBetweenGroupAndItem = 0;

      minimalPoint.forEach(idxGrouped => {
        averageDistanceBetweenGroupAndItem += matrixDistance[line][idxGrouped]/minimalPoint.length;
      });
      matrixGrouped[0].push(averageDistanceBetweenGroupAndItem);

      let newLine: LineOfMatrixDistance = [averageDistanceBetweenGroupAndItem] as LineOfMatrixDistance;
      //cut one line and one col;
      let restInThisLine = matrixDistance.slice(line, line + 1)[0];
      for (let i = 0; i < restInThisLine.length; i++) {
        if (minimalPoint.indexOf(i) === -1) {
          newLine.push(restInThisLine[i])
        }
      }
      newLine.id = matrixDistance[line].id;
      matrixGrouped.push(newLine);
    }
    return matrixGrouped;
  }

  /**
   * 元素距离矩阵
   */
  getDistanceMatrix() {
    const matrixDistance = this.elements.map((el, index) => {
      const ret: LineOfMatrixDistance = this.elements.map(elCompare => {
        return computeElementDistance(el, elCompare);
      }) as LineOfMatrixDistance;
      ret.id = index;
      return ret;
    }) as MatrixDistance;
    return matrixDistance;
  }

  _generateIdDendrogram() {
    const matrixDistance = this.getDistanceMatrix();
    let _genMatrix = matrixDistance;
    do {
      let minimalPoint = UPGMACluster.getMinFromMatrix(_genMatrix);
      _genMatrix = UPGMACluster.formNewMatrixFrom(_genMatrix, [minimalPoint[0], minimalPoint[1]]);
      //_genMatrix is [minPoints, ...rest]
    } while (_genMatrix.length > 2);

    return _genMatrix;
  }

  generate() {
    // 获得元素距离矩阵
    const idDendrogram = this._generateIdDendrogram();

    return idDendrogram.map(a => a.id);

    // TODO: 根据 id 获取 elm
  }
}
