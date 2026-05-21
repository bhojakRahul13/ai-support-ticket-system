import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
  const { password, ...safeUser } = user;

  return safeUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: userPassword, ...safeUser } = user;

  return {
    token,
    safeUser,
  };
};
