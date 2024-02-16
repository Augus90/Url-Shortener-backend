const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const config = require("../src/config/config.js");

const doc = {
  info: {
    version: "1.0.0",
    title: "URL Shortener",
    description:
      "A URL shortener that allows you to provide short URLs of your application",
  },
  servers: [
    {
      url: `/api/v1/`, // by default: 'http://localhost:3000'
      description: "V1 API", // by default: ''
      port: config.port,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../src/routes/router.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require("../src/index.js");
});
