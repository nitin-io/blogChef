import User from "../models/user.js";

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
