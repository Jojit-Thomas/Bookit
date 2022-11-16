// const createHttpError = require("http-errors");
import createHttpError from "http-errors";
// const { user_model } = require("../models/user_model")
import {user_model, user_type} from "../models/user_model"

export default {
  createUser : (user: user_type) => {
    return new Promise((resolve, reject) => {
      user_model.create(user).then(({_id}) => {
        resolve(_id);
      }).catch(err => {
        console.log(err)
        if(err.name === 'MongoServerError' && err.code == 11000) {
          reject(createHttpError.Conflict("Email is already registered"))
        } else {
          reject(createHttpError.InternalServerError())
        }
      })
    })
  },
  getUserByEmail : (email: String) => {
    return new Promise((resolve, reject) => {
      user_model.findOne({email : email}).then((user: any) => {
        user ? resolve(user) : reject(createHttpError.NotFound("Email or password is wrong"))
      })
    })
  }
}