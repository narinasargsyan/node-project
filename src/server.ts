import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./api/routes/users";
import { articleRouter } from "./api/routes/articles";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/users", userRouter);
app.use("/articles", articleRouter);

app.listen(process.env.APP_PORT);
