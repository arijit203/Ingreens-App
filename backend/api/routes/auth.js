// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Example of a protected route
app.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});
