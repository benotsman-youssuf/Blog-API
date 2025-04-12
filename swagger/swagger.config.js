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
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["user", "admin"] }
          }
        },
        Blog: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            category: { type: "string" },
            tags: { 
              type: "array",
              items: { type: "string" }
            },
            author: { 
              type: "string", 
              description: "User ID reference" 
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js", "./swagger/*.js"], // Path to route files and additional swagger definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;