import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: ObjectId,
  articleId: ObjectId,
  createdAt: Date
});
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;