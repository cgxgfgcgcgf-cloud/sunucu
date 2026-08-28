const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Botlar aktif ve calisiyor!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda calisiyor.`);
});

// Yukarıdaki bot kodunu buraya dahil ediyoruz
require('./index.js');
