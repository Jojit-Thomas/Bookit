// var express = require('express');
import express from "express";
import { verify } from "../middlewares/auth";
// const { verify } = require('../middlewares/auth');
var router = express.Router();



/* GET home page. */
router.get('/',verify, function(req , res, next) {
  console.log(req.user)
  res.status(200).json("This is a sample application");
});

export default router;
