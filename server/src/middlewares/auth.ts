import { RequestHandler } from "express";

// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const verify:RequestHandler = (req, res, next) => {
  try {
    if(!process.env.JWT_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
    if(!req.headers.authorization) throw({status : 401, message : "Unauthorized"})
    const accessToken = req.headers.authorization;
    const user = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
    console.log("```user``` : ",typeof user)
    req.user = user;
    next()
  } catch (e : any) {
    console.table(e)
    if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
      res.status(401).json(e)
    }
    res.status(e.status || 500).json(e.message);
  }
}