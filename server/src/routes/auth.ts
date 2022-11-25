// var express = require("express");
import express from "express";
var router = express.Router();
// const Auth = require("../controllers/auth");
import Auth from "../controllers/auth"

/* GET users listing. */

router.post("/access/refresh", Auth.refreshAccessToken);
router.post("/login", Auth.login);
router.post("/register", Auth.register);
router.delete("/logout", Auth.logout)
router.post("/admin/login", Auth.admin_login)

export default router;
