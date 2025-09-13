import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() title!: string;
  @Column() author!: string;

  @Column({ unique: true }) isbn!: string;

  @Column('int') publicationYear!: number;

  @Column('int', { default: 1 }) quantity!: number;

  @Column({ nullable: true }) coverPath?: string;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
