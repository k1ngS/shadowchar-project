import { Module } from '@nestjs/common';
import { CharacterTalentsController } from './character-talents.controller';
import { CharacterTalentsService } from './character-talents.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CharacterTalentsController],
  providers: [CharacterTalentsService]
})
export class CharacterTalentsModule {}
