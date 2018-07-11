const proxyObject = require('./');

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

const delimiter = '--------------------';
const logAndExec = (m) => {
  console.log('executing: %s', m);
  eval(m);
  console.log(delimiter);
}

console.log(delimiter);
logAndExec('obj.a[3] = { bb: 22, cc: 44 };');
logAndExec('delete obj.a[3].cc;');
logAndExec('obj.a[3].bb = { a: 1, b: 2, c: [33, 44] };');
logAndExec('delete obj.a[3].bb.c[1];');
logAndExec('obj.a[3].bb.c.push(2,3,4);');
logAndExec('obj.a[3].bb.c.unshift(0,1,1);');
logAndExec('obj.a[3].bb.c.pop();');

logAndExec('obj.a[5] = 55;');
logAndExec('obj.a[6] = 66;');

/* OUTPUT:

--------------------
executing: obj.a[3] = { bb: 22, cc: 44 };
proxy notification: a[3] = { bb: 22, cc: 44 }
--------------------
executing: delete obj.a[3].cc;
proxy notification: removed a[3].cc
--------------------
executing: obj.a[3].bb = { a: 1, b: 2, c: [33, 44] };
proxy notification: a[3].bb = { a: 1, b: 2, c: [ 33, 44 ] }
--------------------
executing: delete obj.a[3].bb.c[1];
proxy notification: removed a[3].bb.c[1]
--------------------
executing: obj.a[3].bb.c.push(2,3,4);
proxy notification: a[3].bb.c[2] = 2
proxy notification: a[3].bb.c[3] = 3
proxy notification: a[3].bb.c[4] = 4
--------------------
executing: obj.a[3].bb.c.unshift(0,1,1);
proxy notification: a[3].bb.c[7] = 4
proxy notification: a[3].bb.c[6] = 3
proxy notification: a[3].bb.c[5] = 2
proxy notification: a[3].bb.c[4] = undefined
proxy notification: a[3].bb.c[3] = 33
proxy notification: a[3].bb.c[0] = 0
proxy notification: a[3].bb.c[1] = 1
proxy notification: a[3].bb.c[2] = 1
--------------------
executing: obj.a[3].bb.c.pop();
proxy notification: removed a[3].bb.c[7]
proxy notification: a[3].bb.c.length = 7
--------------------
*/
