import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTalentDto {
  @ApiProperty({ example: 'Ambidestro ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Você pode usar um item em cada mão...',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
