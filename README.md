## recursive-object-proxy

Like ES6 proxies but deeper. Will notify you whenever a property of an object is
updated, no matter how nested it is.

`npm i recursive-object-proxy`

```js
const proxyObject = require('recursive-object-proxy');

const o = {
  a: [
    1, 2, 3, 4, [ 5, 6, 7]
  ],
  b: {
    c: { d: [1, 2, 3], e: 5 }
  }
};

const obj = proxyObject(o, (path, val, isRemoved) => {
  process.stdout.write('proxy notification: ');

  if (isRemoved) {
    console.log(`removed ${path}`);
  } else {
    console.log(`${path} =`, val);
  }
});

obj.a[3] = { bb: 22, cc: 44 };
// console output: proxy notification: a[3] = { bb: 22, cc: 44 }
```

See `example.js` for more examples.

### Extra

More about proxies: http://exploringjs.com/es6/ch_proxies.html

Similar projects:

- https://github.com/ElliotNB/observable-slim

- https://github.com/vertexbz/recursive-proxy

### License MIT

https://alessioalex.mit-license.org/
