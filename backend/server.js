import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});


app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
