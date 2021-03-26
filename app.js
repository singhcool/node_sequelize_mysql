const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const user = require("./routes/user");
const login = require("./routes/login");

const app = express();
const errorHandler = require("./middlewares/error.middleware");

const swaggerDefinition = {
  info: {
    title: "Node Swagger API",
    version: "1.0.1",
    description: "Demonstrating how to desribe a RESTful API with Swagger",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "authorization",
      in: "header"
    }
  }
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/login", login);
app.use("/api/user", user);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(errorHandler);

app.listen(3000);
