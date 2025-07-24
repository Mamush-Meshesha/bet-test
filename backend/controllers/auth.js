import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { sendResetEmail } from "../utils/mailer.js";
import crypto from "crypto";

const prisma = new PrismaClient();
const RegisterUser = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const exist = await prisma.user.findUnique({
      where: { email },
    });
    if (exist) {
      res.status(402).json({ message: "email or phone already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
      },
    });
    const token = generateToken(res,newUser.id);
    res
      .status(201)
      .json({ message: "User created Succesfully", newUser, token });
  } catch (error) {
    console.log(error.message);
  }
};

const LoginUser = async (req, res) => {
  const { phone, email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res,user.id);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const ResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user)
    return res.status(400).json({ message: "Token is invalid or expired" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  res.json({ message: "Password reset successful" });
};

const RequestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "Email not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashedToken,
      resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  await sendResetEmail(email, resetToken);
  res.json({ message: "Reset link sent to email" });
};

export { RegisterUser, LoginUser, ResetPassword, RequestPasswordReset };
