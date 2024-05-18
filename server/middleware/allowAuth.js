const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decodedToken.id;

    return next();
  } catch (err) {
    
    const error = new Error(err.message);
    error.statusCode = 500;
    return next(error);
  }
};
