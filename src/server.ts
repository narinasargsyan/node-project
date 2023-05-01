import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { userRouter } from "./api/routes/users";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", userRouter);

app.listen(process.env.APP_PORT);
