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

@ApiTags('Talents (Master List)') // Tag para o Swagger
@UseGuards(AuthGuard('jwt')) // Protege as rotas, idealmente seria um guard de Admin
@Controller('talents') // Rota base para o catálogo de talentos
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  create(@Body() createTalentDto: CreateTalentDto) {
    return this.talentsService.create(createTalentDto);
  }

  @Get()
  findAll() {
    return this.talentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.talentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTalentDto: UpdateTalentDto,
  ) {
    return this.talentsService.update(id, updateTalentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.talentsService.remove(id);
  }
}