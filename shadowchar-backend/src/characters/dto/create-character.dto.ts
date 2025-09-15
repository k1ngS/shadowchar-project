import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ancestry: string;

  // optionals
  @IsInt()
  @IsOptional()
  strength?: number;

  @IsInt()
  @IsOptional()
  agility?: number;

  @IsInt()
  @IsOptional()
  intellect?: number;

  @IsInt()
  @IsOptional()
  will?: number;
}
