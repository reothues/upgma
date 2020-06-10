```javascript

let {UPGMAElement, UPGMACluster} = require('../lib/index.js');

let cluster = new UPGMACluster();

cluster.elements.push(
  new UPGMAElement('jupiter', 'jupiter', 'framework', 'ssr', 'garr'),
  new UPGMAElement('eden', 'eden', 'framework', 'ssr', 'gecko'),
  new UPGMAElement('gecko', 'offline', 'channel'),
  new UPGMAElement('lynx', 'rn-like', 'framework', 'client'),
  new UPGMAElement('devops', 'devops', 'pipeline'),
);

// generate Map, print id;
const matrix = cluster.getDistanceMatrix()
console.log(matrix);
const dendrogram = cluster.generate();
console.log(JSON.stringify(dendrogram, null, 2));

const nameDendrogram = fsa(dendrogram, cluster);
console.log(JSON.stringify(nameDendrogram, null, 2));

function fsa(row, cluster1) {
  return row.map(item => {
    if (typeof item === 'number') {
      return cluster1.elements[item].name;
    } else {
      return fsa(item, cluster1);
    }
  });
}

```

# API
```typescript
new UPGMAElement(...tags: string[]);
new UPGMACluster();

var cluster: UPGMACluster;
cluster.elements: Array<UPGMAElement>;
cluster.generate(): MatrixDistance;


//types

type IdLineOfMatrixDistance = number | Array<IdLineOfMatrixDistance>;

type LineOfMatrixDistance = Array<number> & {id: IdLineOfMatrixDistance}

type MatrixDistance = Array<LineOfMatrixDistance>;

```
