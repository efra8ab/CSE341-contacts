require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const port = process.env.PORT || 8080;

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts within the CSE341 course project",
  },
  host: process.env.SWAGGER_HOST || `localhost:${port}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    Contact: {
      _id: "69087bd558cdd8c50f19938a",
      firstName: "Bruce",
      lastName: "Banner",
      email: "smash@gamma.com",
      favoriteColor: "Green",
      birthday: "1980",
    },
    NewContact: {
      firstName: "Diana",
      lastName: "Prince",
      email: "wonderwoman@themiscira.gov",
      favoriteColor: "Yellow",
      birthday: "1984",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
