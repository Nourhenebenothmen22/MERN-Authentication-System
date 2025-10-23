// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Authentication API",
      version: "1.0.0",
      description: "API pour gérer l’authentification des utilisateurs (register, login, etc.)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Serveur local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // 🔥 Assure-toi que le chemin est correct selon ta structure
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
  console.log(`✅ Swagger docs disponibles sur : http://localhost:${port}/api-docs`);
};
