import jsonwebtoken from "jsonwebtoken";

import User from "../models/user.model.js";

export async function auth_required(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  let result;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    let user = await User.findOne({
      token,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      user_type: user.user_type,
    };

    if (!user) {
      result = {
        message: "Authorization error",
      };

      return res.status(403).json(result);
    }

    result = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    if (!user.username === result.username) {
      result = {
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }

    req.decoded = result;

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Token expired",
      });
    }

    return res.status(403).json({
      message: "Authentication error",
    });
  }
}

export async function auth_required_or_read_only(req, res, next) {
  const SAFE_METHODS = ["GET", "OPTIONS"];

  if (SAFE_METHODS.includes(req.method)) {
    next();
  }
}
