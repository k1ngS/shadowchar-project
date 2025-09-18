import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TalentsModule } from './talents/talents.module';
import { CharacterTalentsModule } from './character-talents/character-talents.module';

@Module({
  imports: [CharactersModule, PrismaModule, AuthModule, TalentsModule, CharacterTalentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
