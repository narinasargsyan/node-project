import * as bcrypt from "bcrypt";
import { models } from "../../db";
import authService from "../services/auth.service";

class UserController {

  signUp = async (req, res) => {
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
      res.send("You have successfully registered!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  signIn = async (req, res) => {
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

      const auth = { email, id: String(isUserExists.id) };
      const accessToken = await authService.signAccessToken(auth);

      const result = {
        accessToken,
      };
      res.status(200).send(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };
}

export default UserController;
