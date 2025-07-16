const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A REST API for managing contacts, for CSE 341.',
  },
  host: 'localhost:3000', // Change this to your Render URL when deploying
  schemes: ['http'],      // Change to ['https'] for production on Render
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; // Path to your routes file

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);