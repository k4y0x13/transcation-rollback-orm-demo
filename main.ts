import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  // start a transaction
  const transaction = await prisma.$transaction([ // [1, 2]
    prisma.user.create({
      data: {
        name: "g",
        email: "g@mail.com",
      },
    }),

    prisma.user.create({
      data: {
        name: "y",
        email: "y@mail.com",
      },
    }),
    
    prisma.user.create({
      data: {
        name: "z",
        email: "z@mail.com",
      },
    }),
  ]);
}

run()
  .catch((e) => {
    console.log("Transaction failed", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
