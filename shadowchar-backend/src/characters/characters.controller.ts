import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(
    @GetUser('sub') userId: number,
    @Body() createCharacterDto: CreateCharacterDto
  ) {
    return this.charactersService.create(createCharacterDto, userId);
  }

  @Get()
  findAll(@GetUser('sub') userId: number  ) {
    return this.charactersService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('sub') userId: number, @Param('id') id: string) {
    return this.charactersService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @GetUser('sub') userId: number,
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(+id, updateCharacterDto, userId);
  }

  @Delete(':id')
  remove(
    @GetUser('sub') userId: number,
    @Param('id') id: string) {
    return this.charactersService.remove(+id, userId);
  }
}
