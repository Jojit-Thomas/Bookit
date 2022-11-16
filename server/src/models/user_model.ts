// const mongoose = require("mongoose");
import mongoose from "mongoose";

// const { USER_COLLECTION } = require("../constants/constants");
import { USER_COLLECTION } from "../constants/constants"

export interface user_type {
  user: string;
  name : string,
  email : string,
  password: string
}



const user_schema = new mongoose.Schema({
  name : String,
  email : {
    type: String,
    unique : true,
  },
  password : String,
})

export const user_model = mongoose.model("user_schema", user_schema, USER_COLLECTION)