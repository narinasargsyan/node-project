import * as express from "express";
const userRouter = express.Router();
import UserController from "../controller/users.controller";
import validate from "../middleweares/validation/validate";
import auth from "../middleweares/authentication.middlewear";

const user = new UserController();

const { authenticate } = auth;

userRouter.post("/sign-up", validate("signUpUserSchema"), user.signUp);
userRouter.post("/sign-in", validate("signInUserSchema"), user.signIn);

userRouter.use(authenticate);

userRouter.post("/create", user.createArticle);
userRouter.put("/update", user.updateArticle);

export { userRouter };
