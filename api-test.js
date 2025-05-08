const http = require('http');

console.log('Testing API Connection to backend server...');

// Try to connect to the backend server
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPONSE:', data);
    console.log('Backend API is accessible!');
  });
});

req.on('error', (e) => {
  console.error('API CONNECTION ERROR:');
  console.error(e.message);
  console.error('\nThe backend server is not running or not accessible on port 5000.');
  console.error('Make sure to start the backend server with: npm run server');
});

req.end(); 