import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API documentation for the Blog application",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
