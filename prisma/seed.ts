import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const booleanOptions = [true, false]

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]


function createUser(n: number): Prisma.UserCreateInput[] {
  const users: Prisma.UserCreateInput[] = [];
  for (let k = 0; k < n; k++) {
    const user: Prisma.UserCreateInput = {
      name: `user ${k + 1}`,
      email: `user${k + 1}@prisma.io`,
      posts: { create: [] },
    };
    users.push(user);
  }
  return users;
}


function createPost(n: number): Prisma.PostCreateInput[] {
  const posts: Prisma.PostCreateInput[] = [];
  for (let i = 0; i < n; i++) {
    const post: Prisma.PostCreateInput = {
      title: `Post ${i + 1}`,
      content: `Content of post ${i + 1}`,
      published: booleanOptions[Math.round(Math.random())],
    };
    posts.push(post);
  }
  return posts;
}


const users: Prisma.UserCreateInput[] = createUser(200);
for (const user of users) {
  if (user.posts != undefined)
    user.posts.create = createPost(200);
}


async function main() {
  console.log(`Start seeding ...`)
  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
    })
    if (user.id % 20 == 0)
      console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
