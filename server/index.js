const express = require("express");
const path = require("path");
const rootRouter = require("./src/routes/routes");
const db = require("./src/configs/db");
const cors = require("cors"); // Importer le module CORS
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); // Utiliser le middleware express.json() pour analyser le corps de la requête (données JSON)
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(cookieParser());

/*app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});*/

app.use(
  "/api/courses/get-files/files",
  express.static(path.join(__dirname, "./files"))
);

app.use(
  "/api/categories/getImage/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

const port = 3000;

app.use("/api", rootRouter);

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
