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

  private async verifyCharacterOwnership(characterId: number, userId: number) {
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new NotFoundException(
        `Personagem com ID ${characterId} não encontro.`,
      );
    }

    if (character.ownerId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar os talentos deste personagem.',
      );
    }
  }

  async create(
    createTalentDto: CreateTalentDto,
    characterId: number,
    userId: number,
  ) {
    await this.verifyCharacterOwnership(characterId, userId);

    return this.prisma.talent.create({
      data: {
        ...createTalentDto,
        characterId: characterId,
      },
    });
  }

  async findAll(characterId: number, userId: number) {
    await this.verifyCharacterOwnership(characterId, userId);

    return this.prisma.talent.findMany({
      where: {
        characterId: characterId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} talent`;
  }

  update(id: number, updateTalentDto: UpdateTalentDto) {
    return `This action updates a #${id} talent`;
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }
}
