let {UPGMAElement, UPGMACluster} = require('../src/index.js');
let x = new UPGMACluster();
let tags = 'whateveritis';

for (var i = 0; i<10; i++) {
  let _t = [];
  for (var t = 0; t < Math.random(); t += .1) {
    _t.push(randTags())
  }
  let el = new UPGMAElement(..._t)
  x.elements.push(el);
}

function randTags () {
  return tags.charAt(Math.round(Math.random() * tags.length));
}


console.trace('test', x.generate().map(a => a.id))