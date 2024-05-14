const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    return next();
  }
  
  req.id = decodedToken.id;
  return next();
};
