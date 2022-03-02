import express from "express";
import mongoose from "mongoose";
import routerAuth from "./routes/auth.js";
import "dotenv/config";
import postRouter from "./routes/post.js";
import cors from "cors";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5jhar.mongodb.net/learn-mern?retryWrites=true&w=majority`
    );
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello Word!");
});
app.use("/api/posts", postRouter);
app.use("/api/auth", routerAuth);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
