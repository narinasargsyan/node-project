import * as bcrypt from "bcrypt";
import { models } from "../../db";
import db from "../../db/models"
import { Response, Request } from "express";
import AuthService from "common_auth";
const authService = new AuthService(db.redis)

class UserController {

  signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await models.Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      return res.send("You have successfully registered!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const isUserExists = await models.Users.findOne({ where: { email } });
      if (!isUserExists) {
        res.status(400).send("User not exists");
        return;
      }
      const validPassword = bcrypt.compare(password, isUserExists.password);
      if (!validPassword) {
        res.status(400).send("Credentials are invalid");
        return;
      }

      const auth = { email, id: String(isUserExists.id), isUser: true };
      const accessToken = await authService.signAccessToken(auth);

      const result = {
        accessToken,
      };
      return res.status(200).send(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };
}

export default UserController;
