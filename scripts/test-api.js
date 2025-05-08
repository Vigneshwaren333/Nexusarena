const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/tournaments',
  method: 'GET'
};

console.log('Testing API connection to /api/tournaments...');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const tournaments = JSON.parse(data);
      console.log(`Received ${tournaments.length} tournaments:`);
      
      tournaments.forEach((tournament, index) => {
        console.log(`\nTournament ${index + 1}:`);
        console.log(`Title: ${tournament.title}`);
        console.log(`Game: ${tournament.game}`);
        console.log(`ID: ${tournament._id || tournament.id}`);
        console.log(`Is Dummy: ${tournament.isDummy ? 'Yes' : 'No'}`);
      });
      
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end(); 