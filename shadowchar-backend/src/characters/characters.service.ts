import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Character } from './entities/character.entity';
import { Character as CharacterModel } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Método "guardião" privado. Ele busca um personagem pelo ID e
   * verifica se o userId fornecido é o dono.
   * Lança 404 se não encontrar, e 403 se o dono for diferente.
   */
  private async getCharacterOwner(characterId: number, userId: number) {
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundException(`Personagem com ID #${characterId} não encontrado.`);
    }

    if (character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este recurso.');
    }

    return character;
  }

  private mapToEntity(character: CharacterModel): Character {
    return {
      ...character,
      health: character.strength,
      insanity: character.will,
      corruption: 0,
      defense: character.agility,
    };
  }

  async create(createCharacterDto: CreateCharacterDto, userId: number) {
    const character = await this.prisma.character.create({
      data: {
        ...createCharacterDto,
        ownerId: userId,
      },
    });
    return this.mapToEntity(character);
  }

  findAll(userId: number) {
    return this.prisma.character.findMany({
      where: { ownerId: userId },
    });
  }

  async findOne(id: number, userId: number) {
    // Agora usa nosso método seguro
    return this.getCharacterOwner(id, userId);
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
    userId: number,
  ) {
    // Garante que o usuário é o dono antes de tentar atualizar
    await this.getCharacterOwner(id, userId);

    return this.prisma.character.update({
      where: { id },
      data: updateCharacterDto,
    });
  }

  async remove(id: number, userId: number) {
    // Garante que o usuário é o dono antes de tentar deletar
    await this.getCharacterOwner(id, userId);

    return this.prisma.character.delete({ where: { id } });
  }

  async findAllTalents(characterId: number, userId: number) {
    // Garante que o usuário é o dono do personagem antes de listar os talentos
    await this.getCharacterOwner(characterId, userId);

    return this.prisma.characterTalent.findMany({
      where: {
        characterId: characterId
      },
      include: {
        talent: true // Pede ao Prisma para trazer os detalhes do talento relacionado
      }
    });
  }
}