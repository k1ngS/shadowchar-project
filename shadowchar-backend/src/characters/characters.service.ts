import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Character } from './entities/character.entity';
import { Character as CharacterModel } from 'generated/prisma';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(character: CharacterModel): Character {
    return {
      ...character,
      health: character.strength,
      insanity: character.will,
      corruption: 0,
      defense: character.agility,
    };
  }

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

  async findAll(userId: number): Promise<Character[]> {
    const charactersFromDb = await this.prisma.character.findMany({
      where: {
        ownerId: userId,
      },
    });
    return charactersFromDb.map(this.mapToEntity);
  }

  async findOne(id: number, userId: number): Promise<Character> {
    const charactersFromDb = await this.prisma.character.findUnique({
      where: { id, ownerId: userId },
    });

    if (!charactersFromDb) {
      throw new NotFoundException(
        `Personagem com ID ${id} não encontrado ou não pertence a você.`,
      );
    }
    return this.mapToEntity(charactersFromDb);
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
