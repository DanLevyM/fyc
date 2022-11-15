import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// addPostToUser();
	// createPostsWithUser();
	// updatePost();
	// deleteAllPosts();
	deletePost();
}

async function addPostToUser() {
	const createPost = await prisma.post.create({
		data: {
			title: 'How to make croissants',
			content: 'This is a post about croissants',
			published: true,
			author: {
				connectOrCreate: {
					where: {
						name: 'Paul',
					},
					create: {
						name: 'Alice',
					},
				},
			},
		},
		include: {
			author: true,
		},
	});
	console.log(createPost);
}

async function createPostsWithUser() {
	const createUserAndPost = await prisma.user.create({
		data: {
			name: 'Elsa Prisma',
			posts: {
				create: [
					{ title: 'How to make an omelette' },
					{ title: 'How to eat an omelette' },
				],
			},
		},
	});
	console.log(createUserAndPost);
}

async function updatePost() {
	const updatePost = await prisma.user.update({
		where: {
			id: 1,
		},
		data: {
			posts: {
				disconnect: [{ id: 12 }, { id: 19 }],
			},
		},
		select: {
			posts: true,
		},
	});
	console.log(updatePost);
}

async function deletePost() {
	const update = await prisma.user.update({
		where: {
			id: 2,
		},
		data: {
			posts: {
				deleteMany: {
					published: true,
				},
			},
		},
	});
}

async function deleteAllPosts() {
	await prisma.user.update({
		where: {
			id: 5,
		},
		data: {
			posts: {
				deleteMany: {},
			},
		},
	});
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
