const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
async function CommentSeeder() {
    const data = [];
    const usersCount = await prisma.user.count();
    const postsCount = await prisma.post.count();

    if (usersCount === 0 || postsCount === 0) {
        console.log("No users or posts found. Ensure users and posts are seeded first.");
        return;
    }

    for (let i = 0; i < 40; i++) {
        const content = faker.lorem.paragraph();
        const userId = faker.number.int({ min: 1, max: usersCount });
        const postId = faker.number.int({ min: 1, max: postsCount });
        data.push({ content, userId, postId });
    }
    console.log("Comment seeding started...");
    await prisma.comment.createMany({ data });
    console.log("Comment seeding done.");
}
module.exports = { CommentSeeder };
