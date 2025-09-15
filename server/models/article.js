import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  _id: ObjectId,
  title: String,
  description: String,
  url: String,
  source: String,
  publishedAt: Date,
  tags: [String],         // ["AI", "Technology"]
  summary: String,        // optional - from LLM microservice
  createdAt: Date
})