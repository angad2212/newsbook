import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"
//import api from "./routes/api.js";
//sample command: node server/index.js

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

//app.use("/api", api);
//app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
