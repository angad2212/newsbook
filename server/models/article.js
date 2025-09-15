import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true }, // link to source
  source: { type: String },              // e.g., "NYTimes", "YouTube"
  publishedAt: { type: Date },

  tags: { type: [String], default: [] }, // ["AI", "Space"]
  summary: { type: String },             // optional (from LLM summarizer)

}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);

export default Article;
