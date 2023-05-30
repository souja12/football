const cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
}).listen(3002, '0.0.0.0', () => {
  console.log('CORS proxy server running on 0.0.0.0:3002');
});



// const PORT = 3001; // Change this to the desired port number
// const HOST = '0.0.0.0'; // Change this to the desired host address

// cors_proxy.createServer({
//   originWhitelist: [], // Allow all origins
// }).listen(PORT, HOST, () => {
//   console.log(`CORS proxy server running on ${HOST}:${PORT}`);
// });


// const server = cors_proxy.createServer({
//   originWhitelist: [], // Allow all origins
// });

// server.listen(0, '0.0.0.0', () => {
//   const { port } = server.address();
//   console.log(`CORS proxy server running on 0.0.0.0:${port}`);
// });