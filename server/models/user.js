import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,   // store only hashed
  interests: [String],    // ["AI", "Politics", "Space"]
  bookmarks: [ObjectId],  // refs to saved articles
  readArticles: [ObjectId], // refs to articles marked as read
  createdAt: Date,
  updatedAt: Date
})
const User = mongoose.model("User", userSchema);

export default User;