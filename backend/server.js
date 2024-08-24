const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*", // or specify your frontend's URL instead of '*'
  })
);
app.use(bodyParser.json());

// Create a MySQL connection
// const connection = mysql.createConnection({
//   host: "localhost", // Replace with your MySQL host
//   user: "root", // Replace with your MySQL user
//   password: "root", // Replace with your MySQL password
//   database: "PROJECT", // Replace with your MySQL database name
// });

const connection = mysql.createConnection({
  host: "bjsyvt822g7ahozjgxqe-mysql.services.clever-cloud.com",
  user: "ur9ppd0mn44uv7oa",
  password: "Oownoy5fZBDyiZxzrhMQ",
  database: "bjsyvt822g7ahozjgxqe",
  port: 3306,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email: ", email, " password:", password);

  const query = "SELECT * FROM ALL_USERS WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log("Token to be generated: ");
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h", // Token expiry time
            }
          );
          console.log("TOken generated: ", token);
          res.status(200).json({ message: "Login successful", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/validate-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
