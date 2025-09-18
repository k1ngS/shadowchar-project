import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('talents')
@UseGuards(AuthGuard('jwt'))
@Controller('characters/:characterId/talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  create(
    @Param('characterId', ParseIntPipe) characterId: number,
    @GetUser('sub') userId: number,
    @Body() createTalentDto: CreateTalentDto,
  ) {
    return this.talentsService.create(createTalentDto, characterId, userId);
  }

  @Get()
  findAll(
    @Param('characterId', ParseIntPipe) characterId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.talentsService.findAll(characterId, userId);
  }

  @Get(':talentId')
  findOne(
    // Note que não precisamos do characterId aqui, pois a validação é feita pelo talentId
    @Param('talentId', ParseIntPipe) talentId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.talentsService.findOne(talentId, userId);
  }

  @Patch(':talentId')
  update(
    @Param('talentId', ParseIntPipe) talentId: number,
    @GetUser('sub') userId: number,
    @Body() updateTalentDto: UpdateTalentDto,
  ) {
    return this.talentsService.update(talentId, updateTalentDto, userId);
  }

  @Delete(':talentId')
  remove(
    @Param('talentId', ParseIntPipe) talentId: number,
    @GetUser('sub') userId: number,
  ) {
    return this.talentsService.remove(talentId, userId);
  }
}