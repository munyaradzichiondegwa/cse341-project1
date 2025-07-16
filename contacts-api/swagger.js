const swaggerAutogen = require('swagger-autogen')();

const host = process.env.SWAGGER_HOST || 'localhost:3000';
const schemes = host.includes('localhost') ? ['http'] : ['https'];

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A REST API for managing contacts, for CSE 341.',
  },
  host: host,    // Use env var or default to localhost
  schemes: schemes, // http locally, https on deployed
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
