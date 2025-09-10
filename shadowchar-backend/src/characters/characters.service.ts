import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharactersService {

  constructor(private prisma: PrismaService) { }

  create(createCharacterDto: CreateCharacterDto) {
    return this.prisma.character.create({ data: createCharacterDto });
  }

  findAll() {
    return this.prisma.character.findMany();
  }

  findOne(id: number) {
    return this.prisma.character.findUnique({ where: { id } });
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

  remove(id: number) {
    return this.prisma.character.delete({ where: { id } });
  }
}
