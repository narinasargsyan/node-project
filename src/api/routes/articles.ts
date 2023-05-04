import * as express from "express";
const articleRouter = express.Router();
import ArticleController from "../controller/article.controller";
import auth from "../middleweares/authentication.middlewear";

const article = new ArticleController();

const { authenticate } = auth;

articleRouter.use(authenticate);
articleRouter.post("/create", article.createArticle);
articleRouter.put("/update", article.updateArticle);

export { articleRouter };
