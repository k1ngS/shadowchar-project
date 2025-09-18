import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTalentDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tier: string;

  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Os campos de JSON são mais complexos de validar com DTOs,
  // por enquanto podemos deixá-los de fora ou usar @IsObject() @IsOptional()
  // prerequisite?: any;
  // effects?: any;
}