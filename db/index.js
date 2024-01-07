import mongoose from "mongoose";

export default (uri) =>
  mongoose.connect(uri).then(() => {
    console.log("database connected!");
  });
