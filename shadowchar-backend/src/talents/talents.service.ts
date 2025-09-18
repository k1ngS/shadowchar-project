import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TalentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Verifica se o personagem pertence ao usuário logado.
   * Lança 404 se o personagem não existe, e 403 se não pertence ao usuário.
   */
  private async verifyCharacterOwnership(characterId: number, userId: number) {
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundException(
        `Personagem com ID #${characterId} não encontrado.`,
      );
    }

    if (character.ownerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para gerenciar os talentos deste personagem.',
      );
    }
  }

  /**
   * Busca um talento específico e garante que ele pertence a um personagem do usuário.
   */
  private async findTalentAndVerifyOwnership(talentId: number, userId: number) {
    const talent = await this.prisma.talent.findUnique({
      where: { id: talentId },
      include: { character: true }, // Inclui o personagem para checar o dono
    });

    if (!talent) {
      throw new NotFoundException(`Talento com ID #${talentId} não encontrado.`);
    }

    if (talent.character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este recurso.');
    }

    return talent;
  }

  async create(
    createTalentDto: CreateTalentDto,
    characterId: number,
    userId: number,
  ) {
    // Garante que o usuário é dono do personagem antes de criar um talento
    await this.verifyCharacterOwnership(characterId, userId);

    return this.prisma.talent.create({
      data: {
        ...createTalentDto,
        characterId: characterId,
      },
    });
  }

  async findAll(characterId: number, userId: number) {
    // Garante que o usuário é dono do personagem antes de listar os talentos
    await this.verifyCharacterOwnership(characterId, userId);

    return this.prisma.talent.findMany({
      where: { characterId: characterId },
    });
  }

  async findOne(talentId: number, userId: number) {
    // Garante que o usuário é o dono do personagem ao qual o talento pertence
    return this.findTalentAndVerifyOwnership(talentId, userId);
  }

  async update(
    talentId: number,
    updateTalentDto: UpdateTalentDto,
    userId: number,
  ) {
    // Garante a propriedade antes de atualizar
    await this.findTalentAndVerifyOwnership(talentId, userId);

    return this.prisma.talent.update({
      where: { id: talentId },
      data: updateTalentDto,
    });
  }

  async remove(talentId: number, userId: number) {
    // Garante a propriedade antes de deletar
    await this.findTalentAndVerifyOwnership(talentId, userId);

    return this.prisma.talent.delete({
      where: { id: talentId },
    });
  }
}