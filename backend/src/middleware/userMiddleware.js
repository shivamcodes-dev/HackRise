const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not present");

    const payload = await jwt.verify(token, process.env.JWT_KEY);
  } catch {}
};
