
let {UPGMAElement, UPGMACluster} = require('../src/index.js');

let cluster = new UPGMACluster();

for (var i = 0; i<10; i++) {
  // create Element with tags;
  let el = new UPGMAElement(...randTags());
  cluster.elements.push(el);
}
// generate Map, print id;
console.trace('test', cluster.generate().map(a => a.id))

function randTags () {
  let tags = 'whateveritis';
  let _t = [];
  for (var t = 0; t < Math.random(); t += .1) {
    _t.push(tags.charAt(Math.round(Math.random() * tags.length)));
  }
  return _t;
}