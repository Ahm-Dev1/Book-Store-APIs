const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization;
    console.log("Full Token", fullToken);

    const token = fullToken?.split(" ")[1];
    if (!token) return res.status(403).send("Access Denied");
    const decodedToken = jwt.verify(token, "shhhh");
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log("There is an Error => " + err);
    res.status(400).send("Invalid Token");
  }
};


