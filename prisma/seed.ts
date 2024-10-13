import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John',
    email: 'John@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          published: true,
          likeNum: 10,
          catgories: {
            create: [
              {
                name: 'Data Base',
              },
              {
                name: 'Big Data',
              },
            ],
          },
        },
        {
          title: 'Follow Prisma on Twitter',
          likeNum: 2,
          published: true,
          catgories: {
            connect: [
              {
                id: 1,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Jack',
    email: 'jack@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Discord',
          likeNum: 21,
          published: false,
          catgories: {
            connect: [
              {
                id: 1,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'sara',
    email: 'sara@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          likeNum: 31,
          published: true,
          catgories: {
            connect: [
              {
                id: 2,
              },
            ],
          },
        },
        {
          title: 'Prisma on YouTube',
          likeNum: 12,
          published: false,
          catgories: {
            connect: [
              {
                id: 1,
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
