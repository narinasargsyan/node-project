import { Response, Request } from "express";
import axios from 'axios';

class ArticleController {
  createArticle = async (req: Request & { payload: { id: number } }, res: Response) => {
    try {
      const { id } = req.payload;
      const { text } = req.body;
      const response = await axios({
        baseURL: `${process.env.ARTICLE_SERVICE_URL}/api/user/create`,
        method: 'POST',
        headers: {
          X_AUTH: process.env.X_AUTH,
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
        data: {
          userId: id,
          text,
        },
      });
      return res.send({response: response.data});
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  updateArticle = async (req: Request & { payload: { id: number } }, res: Response) => {
    try{
      const { id } = req.payload;
      const { text, articleId } = req.body;
      const response = await axios({
        baseURL: `${process.env.ARTICLE_SERVICE_URL}/api/user/update`,
        method: 'PUT',
        headers: {
          X_AUTH: process.env.X_AUTH,
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
        data: {
          userId: id,
          text,
          articleId,
        },
      });
      return res.send({ response: response.data });
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };
}

export default ArticleController;
