import { validate } from "express-validation";
import { validationSchema } from "./validationSchema";

export = (name) =>
  validate(validationSchema[name], validationSchema.config, {});
