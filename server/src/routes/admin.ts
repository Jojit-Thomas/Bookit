// var express = require("express");
import express from "express"
import bus from "../controllers/bus";
import user from "../controllers/user";
import { verifyAdmin } from "../middlewares/auth";
var router = express.Router();

/* GET users listing. */
router.get("/",verifyAdmin, function (req, res, next) {
  
});

router.get("/users", verifyAdmin, user.allUsers)

router.put("/user/block", verifyAdmin, user.block_user)

router.post("/bus/add", bus.addBus)//verifyAdmin

router.get("/bus", verifyAdmin, bus.allBus)

router.get('/bus/:id',verifyAdmin, bus.busDetails);


export default router;
