// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Authentication API",
      version: "1.0.0",
      description: "API pour gérer l’authentification des utilisateurs (register/login)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // chemin vers tes routes avec annotations Swagger
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`✅ Swagger docs available at http://localhost:${port}/api-docs`);
};
