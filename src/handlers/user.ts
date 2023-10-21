import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const signinUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      const error = new Error("User not found");
      res.statusCode = 404;
      throw error;
    }
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      const error = new Error("Invalid password");
      res.statusCode = 401;
      throw error;
    }
    const token = createJWT(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
