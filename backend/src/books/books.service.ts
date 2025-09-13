import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  list(q?: string) {
    if (q) {
      return this.repo.find({
        where: [
          { title: Like(`%${q}%`) },
          { author: Like(`%${q}%`) },
          { isbn: Like(`%${q}%`) },
        ],
        order: { createdAt: 'DESC' },
      });
    }
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async get(id: number) {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  create(data: CreateBookDto, coverPath?: string) {
    const book = this.repo.create({ ...data, coverPath });
    return this.repo.save(book);
  }

  async update(id: number, data: UpdateBookDto, coverPath?: string) {
    const book = await this.get(id);
    Object.assign(book, data);
    if (coverPath !== undefined) book.coverPath = coverPath;
    return this.repo.save(book);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { ok: true };
  }

  async borrow(id: number) {
    const b = await this.get(id);
    if (b.quantity <= 0) throw new NotFoundException('Out of stock');
    b.quantity -= 1;
    return this.repo.save(b);
  }

  async return(id: number) {
    const b = await this.get(id);
    b.quantity += 1;
    return this.repo.save(b);
  }
}
