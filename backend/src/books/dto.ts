import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() author!: string;
  @IsString() @IsNotEmpty() isbn!: string;
  @IsInt() publicationYear!: number;
  @IsInt() @Min(0) quantity!: number;
}

export class UpdateBookDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() isbn?: string;
  @IsOptional() @IsInt() publicationYear?: number;
  @IsOptional() @IsInt() @Min(0) quantity?: number;
}
