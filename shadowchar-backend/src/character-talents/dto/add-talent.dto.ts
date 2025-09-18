import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTalentDto {
  @IsNumber()
  @IsNotEmpty()
  talentId: number;
}