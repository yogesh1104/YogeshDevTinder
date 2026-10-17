// leak.js
const express = require('express');
const app = express();
const leaky = [];

app.get('/', (req, res) => {
//   leaky.push(new Array(10000).fill('leak-' + Date.now()));   // har request pe 80KB jama
  res.send('ok');
});

setInterval(() => {
  const m = process.memoryUsage();
console.log('heap:', Math.round(m.heapUsed/1048576),
            'external:', Math.round(m.external/1048576),
            'arrayBuffers:', Math.round(m.arrayBuffers/1048576),
            'rss:', Math.round(m.rss/1048576));
}, 3000).unref();

app.listen(3000);