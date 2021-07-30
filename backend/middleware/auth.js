const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1]; //récupération du token depuis le header Authorization
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Requête non authentifiée !"),
    });
  }
};
