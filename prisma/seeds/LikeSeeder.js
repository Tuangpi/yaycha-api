const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function LikeSeeder() {
    console.log("Post like seeding started...");

    // Ensure that there are users and posts in the database
    const usersCount = await prisma.user.count();
    const postsCount = await prisma.post.count();

    if (usersCount === 0 || postsCount === 0) {
        console.log("No users or posts found. Ensure users and posts are seeded first.");
        return;
    }

    for (let i = 0; i < 5; i++) {
        await prisma.postLike.create({
            data: {
                postId: faker.number.int({ min: 1, max: postsCount }), // Valid postId
                userId: faker.number.int({ min: 1, max: usersCount }), // Valid userId
            },
        });
    }

    console.log("Post like seeding done.");
}

module.exports = { LikeSeeder };
