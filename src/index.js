const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const routerV1 = require("./routes/router");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../test/swagger-output.json");

const db = require("./db/config");
const {
  boomErrorHandler,
  errorHandler,
} = require("./middlewares/error.handler");

const whitelist = config.cors;
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
// app.use(cors(options));
app.use(cors());
app.use(express.json());

const MONGO_URI = `mongodb://${db.USER}:${db.PASSWORD}@${db.HOST}:${db.PORT}/${db.NAME}?authSource=admin&retryWrites=true&writeConcern=majority`;

db.connect(MONGO_URI);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", routerV1);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port || 3000, () => {
  console.log(`--- Server listening on http://localhost:${config.port}`);
});
