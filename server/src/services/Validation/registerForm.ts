// const createHttpError = require("http-errors");
import createHttpError from "http-errors";
// const Joi = require("joi");
import Joi from "joi";
import { user_type } from "../../models/user_model";

const user_schema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});


export const isRegisterFormValid = (params: user_type): Promise<user_type> => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await user_schema.validate(params, { abortEarly: false })
    if(error) {
      console.error("error : ", error.details)
      reject(createHttpError.BadRequest(JSON.stringify(error.details)))
    }else{
      // console.log("validation successful : ", value)
      resolve(value)
    }
  })
}