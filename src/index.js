const firebaseapp = require("./db/firebaseAuth");
const { getAuth } = require("firebase/auth");
const express = require("express");
const app = express();
const port = 5000;
const Router = require("./routes/routes");
const db = require("./db/db");

app.use(express.json());
app.use("/api", Router);
db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });
