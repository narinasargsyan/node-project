import * as express from "express";
const userRouter = express.Router();
import UserController from "../controller/users.controller";
import validate from "../middleweares/validation/validate";

const user = new UserController();

userRouter.post("/sign-up", validate("signUpUserSchema"), user.signUp);
userRouter.post("/sign-in", validate("signInUserSchema"), user.signIn);

export { userRouter };
