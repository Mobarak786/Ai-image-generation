import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Mongodb/Connect.js";
import postRoutes from "./Routes/postRoutes.js";
import dalleRoutes from "./Routes/dalleRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("hello from dal-e");
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGO_DB_URL);
    app.listen(PORT, () => console.log(`app has started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
