import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	createUsers();
}

async function createUsers() {
	await prisma.user.create({
		data: {
			name: 'Alice',
		},
	});

	await prisma.user.create({
		data: {
			name: 'Paul',
		},
	});

	await prisma.user.create({
		data: {
			name: 'Payton',
		},
	});

	await prisma.user.create({
		data: {
			name: 'Penny',
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
