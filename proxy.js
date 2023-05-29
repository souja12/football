const cors_proxy = require('cors-anywhere');

const PORT = 3001; // Change this to the desired port number
const HOST = '0.0.0.0'; // Change this to the desired host address

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
}).listen(PORT, HOST, () => {
  console.log(`CORS proxy server running on ${HOST}:${PORT}`);
});
