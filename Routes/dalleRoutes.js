import express, { response } from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});

const openai = new OpenAIApi(configuration);
router.route("/").get((req, res) => {
  res.send("hello from dall-e");
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;

    res.status(200).json({ photo: image_url });
  } catch (error) {
    res.status(500).send(error?.response.data.error.message);
  }
});
export default router;
