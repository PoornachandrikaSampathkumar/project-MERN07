function authMiddleware(req, res, next) {
  const role = req.headers["x-role"]; // header: x-role = "admin" or "user"
  if (!role) return res.status(401).send("Access Denied");
  req.role = role;
  next();
}

module.exports = authMiddleware;