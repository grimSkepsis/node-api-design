import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
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
};

export const signinUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = createJWT(user);
  res.status(200).json({ token });
};
