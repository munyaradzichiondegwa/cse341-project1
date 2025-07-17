const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A REST API for managing contacts, for CSE 341.',
  },
  host: 'cse341-project1-1-2ox0.onrender.com', // <-- your deployed URL here (no https://)
  schemes: ['https'], // https because Render uses SSL
  basePath: '/contacts', // THIS IS THE CRUCIAL ADDITION
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);