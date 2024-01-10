import { Schema, model } from "mongoose";
import profanityFilter from "../utils/profanityFilter.js";
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isApproved: {
    type: Boolean,
    default: true,
  },
});

// Profanity Filter
postSchema.pre("validate", function (next) {
  if (!this.isModified("content")) {
    return next();
  }

  if (profanityFilter(this.content)) {
    this.isApproved = false;
    return next();
  }

  next();
});

const Post = model("Post", postSchema);

export default Post;
