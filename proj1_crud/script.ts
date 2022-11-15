import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// getBook();
	// getBooks();
	// createBook();
	// updateBook();
	deleteBook();
}

async function getBook() {
	const book = await prisma.book.findUnique({
		where: {
			title: 'Les possibles',
		},
	});
	console.log(book);
}

async function getBooks() {
	const books = await prisma.book.findMany();
	console.log(books);
}

async function createBook() {
	const book1 = await prisma.book.create({
		data: {
			title: 'Misery',
			author: 'Stephan King',
			releaseDate: new Date('2002-09-04'),
		},
	});
	const book2 = await prisma.book.create({
		data: {
			title: 'Central Park',
			author: 'Guillaume Musso',
			releaseDate: new Date('2017-01-05'),
		},
	});
	const book3 = await prisma.book.create({
		data: {
			title: 'Les possibles',
			releaseDate: new Date('2021-05-04'),
		},
	});
}

async function deleteBook() {
	await prisma.book.delete({
		where: {
			title: 'Misery',
		},
	});
	console.log('Book deleted');
}

async function updateBook() {
	const book = await prisma.book.update({
		where: {
			title: 'Les possibles',
		},
		data: {
			author: 'virginie Grimaldi',
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

/**
 * proj 1:
 * CRUD BASIC
 *
 * proj 2:
 * Relationship Queries
 * 		- One to One
 * 		- One to Many
 * 		- Many to Many
 *
 * proj 3:
 * Advanced Queries
 * 		- Filtering
 * 		- Sorting
 * 		- Pagination
 * 		- Aggregation
 * 		- Joining
 *
 */
