import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent duplicate bookmarks (same user, same article)
bookmarkSchema.index({ user: 1, article: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
