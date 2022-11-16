// const { isRegisterFormValid } = require("../services/Validation/registerForm");
import { NextFunction, Request, RequestHandler, Response } from "express"

import {isRegisterFormValid} from "../services/Validation/registerForm"
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
// const AuthDB = require("../services/auth");
import AuthDB from "../services/auth"
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// require("dotenv").config();
import dotenv from "dotenv/config"
import { user_type } from "../models/user_model";



const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!process.env.JWT_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
    if(!process.env.JWT_REFRESH_TOKEN) throw new Error("Jwt refresh token is not provided in env")
    let user : any = await AuthDB.getUserByEmail(req.body.email);
    if(!req.body.password) throw({status : 401, message : "Password is required"});
    let isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordValid) throw({status : 401, message : "Email or password is wrong"});
    let accessToken = jwt.sign({ name: user.name }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "2s", audience : user.email});
    let refreshToken = jwt.sign({}, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1y",});
    res.status(200).json({accessToken, refreshToken})
  } catch (err: any) {
    if (err.status >= 400 && err.status < 500)
      res.status(err.status).json(err.message);
    else next(err);
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await isRegisterFormValid(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await AuthDB.createUser(user);
    res.status(200).json("Registered successfully");
  } catch (err) {
    if(err instanceof Error){
      if (err.status >= 400 && err.status < 500)
      res.status(err.status).json(err.message);
    }
    else next(err);
  }
}

const refreshAccessToken: RequestHandler = async (req, res) => {
    
}


export default {login, register, refreshAccessToken};