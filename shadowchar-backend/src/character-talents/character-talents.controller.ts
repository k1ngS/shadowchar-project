import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query, // 1. Importar o Query para o filtro de tier
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CharacterTalentsService } from './character-talents.service';
import { AddTalentDto } from './dto/add-talent.dto';

@ApiTags('Character Talents')
@UseGuards(AuthGuard('jwt'))
@Controller('characters/:characterId/talents')
export class CharacterTalentsController {
  constructor(
    private readonly characterTalentsService: CharacterTalentsService,
  ) {}

  /**
   * NOVO ENDPOINT: Lista todos os talentos e sua disponibilidade para o personagem.
   * Ex: GET /characters/8/talents/available
   * Ex: GET /characters/8/talents/available?tier=Novice
   */
  @Get('available')
  getAvailable(
    @Param('characterId', ParseIntPipe) characterId: number,
    @GetUser('sub') userId: number,
    @Query('tier') tier?: string,
  ) {
    return this.characterTalentsService.getAvailableTalents(characterId, userId, tier);
  }

  /**
   * Lista os talentos que o personagem JÁ POSSUI.
   * Ex: GET /characters/8/talents
   */
  @Get()
  findAll(
    @Param('characterId', ParseIntPipe) characterId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.characterTalentsService.findAllByCharacter(characterId, userId);
  }

  /**
   * Adiciona um talento a um personagem. A validação agora ocorre no serviço.
   * Ex: POST /characters/8/talents -> Body: { "talentId": 15 }
   */
  @Post()
  addTalent(
    @Param('characterId', ParseIntPipe) characterId: number,
    @GetUser('sub') userId: number,
    @Body() addTalentDto: AddTalentDto,
  ) {
    return this.characterTalentsService.addTalentToCharacter(
      characterId,
      addTalentDto.talentId,
      userId,
    );
  }

  /**
   * Remove um talento de um personagem.
   * Ex: DELETE /characters/8/talents/15
   */
  @Delete(':talentId')
  removeTalent(
    @Param('characterId', ParseIntPipe) characterId: number,
    @Param('talentId', ParseIntPipe) talentId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.characterTalentsService.removeTalentFromCharacter(
      characterId,
      talentId,
      userId,
    );
  }
}