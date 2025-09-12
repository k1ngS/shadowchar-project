import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  create(createCharacterDto: CreateCharacterDto, userId: number) {
    return this.prisma.character.create({
      data: {
        ...createCharacterDto,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.character.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const character = await this.prisma.character.findUnique({
      where: { id, ownerId: userId },
    });

    if (!character) {
      throw new NotFoundException(
        `Personagem com ID ${id} não encontrado ou não pertence a você.`,
      );
    }
    return character;
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
    userId: number,
  ) {
    await this.findOne(id, userId);

    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.character.delete({ where: { id } });
  }
}
