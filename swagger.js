import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Countries API',
    description: 'Documentation for CSE341 Project 2',
  },
  host: 'localhost:3000',
  schemes: ['http'],
 
  definitions: {
    Country: {
      name: "any",
      capital: "any",
      population: 0,
      officialLanguage: "any",
      currency: "any",
      region: "any",
      areaKm2: 0
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);