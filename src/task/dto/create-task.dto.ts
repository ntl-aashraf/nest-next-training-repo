// src/task/dto/create-task.dto.ts
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsInt,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_completed?: boolean;

  @IsInt()
  userId: number;
}
