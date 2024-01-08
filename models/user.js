import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  lastLogIn: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Presave middleware hook
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.checkPassword = function (password) {
  try {
    const match = bcrypt.compareSync(password, this.password);

    if (match) {
      return Promise.resolve();
    }

    return Promise.reject({
      error: { code: 400, message: "Incorrect Password!" },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

userSchema.methods.updateLogIn = function () {
  return this.model("User").findOneAndUpdate(
    { email: this.email },
    {
      lastLogIn: new Date(),
    }
  );
};

const User = model("User", userSchema);

export default User;
