import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  // 10 USERS
  const users = Array.from({ length: 10 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    password: hashedPassword,
    role: "USER",
  }));

  // 10 ADMINS
  const admins = Array.from({ length: 10 }, (_, i) => ({
    name: `Admin ${i + 1}`,
    email: `admin${i + 1}@gmail.com`,
    password: hashedPassword,
    role: "ADMIN",
  }));

  await prisma.user.createMany({
    data: [...users, ...admins],
    skipDuplicates: true,
  });

  console.log("20 users seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
