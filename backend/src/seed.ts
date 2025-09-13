import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './books/book.entity';

const ds = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || 'database/db.sqlite',
  entities: [Book],
  synchronize: true,
});

async function run() {
  await ds.initialize();
  const repo = ds.getRepository(Book);
  if (await repo.count() === 0) {
    await repo.save([
      { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publicationYear: 2008, quantity: 3 },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780201616224', publicationYear: 1999, quantity: 2 },
    ]);
    console.log('Seeded sample books');
  } else {
    console.log('Books already exist');
  }
  process.exit(0);
}
run();
