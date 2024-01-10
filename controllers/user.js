import jwt from "jsonwebtoken";
import User from "../models/user.js";

const sign = (obj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.JWT_SECRET, (error, token) => {
      if (error) {
        return reject(error);
      }

      return resolve(token);
    });
  });
};

const verify = async (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) return reject();
      return resolve();
    });
  });

export const signupAdmin = async ({ name, email, password }) => {
  try {
    const existingUser = User.findOne({ email });

    if (!existingUser) {
      await User.create({ name, email, password, isAdmin: true });
      Promise.resolve();
    }
  } catch (error) {
    Promise.reject();
  }
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, isAdmin: true });

    await user.checkPassword(password);
    await user.updateLogIn();
    return user;
  } catch (error) {
    return error;
  }
};

export const signupUser = async ({ name, email, password }) => {
  try {
    const user = await User.create({ name, email, password });
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
      lastLogIn: user.lastLogIn,
    });
    return {
      user: { id: user._id, name: user.name, lastLogIn: user.lastLogIn },
      token,
    };
  } catch (error) {
    return error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      await user.checkPassword(password);
      await user.updateLogIn();
      const token = await sign({
        id: user._id,
        name: user.name,
        email: user.email,
      });
      return {
        user: { id: user._id, name: user.name, lastLogIn: user.lastLogIn },
        token,
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyToken = async (token) => {
  try {
    const payload = jwt.decode(token);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      throw new Error("Unauthorized!");
    }

    await verify(token);
  } catch (error) {
    return error;
  }
};

export const verifyUser = (email) =>
  new Promise((resolve, reject) => {
    try {
      const user = User.findOne({ email });

      if (user) return resolve(true);
    } catch (error) {
      return reject(false);
    }
  });
