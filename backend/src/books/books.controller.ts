import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TokenAuthGuard } from '../auth/auth.guard';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';

const uploadDir = process.env.UPLOAD_DIR || 'uploads';

@Controller('books')
@UseGuards(TokenAuthGuard)
export class BooksController {
  constructor(private readonly svc: BooksService) {}

  @Get()
  list(@Query('q') q?: string) {
    return this.svc.list(q);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.svc.get(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: uploadDir,
      filename: (_req, file, cb) => {
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
        cb(null, name);
      }
    })
  }))
  create(@Body() dto: CreateBookDto, @UploadedFile() file?: Express.Multer.File) {
    const coverPath = file ? `/uploads/${file.filename}` : undefined;
    return this.svc.create(dto, coverPath);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: uploadDir,
      filename: (_req, file, cb) => {
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
        cb(null, name);
      }
    })
  }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto, @UploadedFile() file?: Express.Multer.File) {
    const coverPath = file ? `/uploads/${file.filename}` : undefined;
    return this.svc.update(id, dto, coverPath);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  @Post(':id/borrow')
  borrow(@Param('id', ParseIntPipe) id: number) {
    return this.svc.borrow(id);
  }

  @Post(':id/return')
  return(@Param('id', ParseIntPipe) id: number) {
    return this.svc.return(id);
  }
}
