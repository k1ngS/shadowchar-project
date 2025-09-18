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

  // Cria um novo talento no catálogo geral do jogo
  create(createTalentDto: CreateTalentDto) {
    return this.prisma.talent.create({
      data: createTalentDto,
    });
  }

  // Lista todos os talentos disponíveis no jogo
  findAll() {
    return this.prisma.talent.findMany();
  }

  // Encontra um talento específico pelo seu ID
  async findOne(id: number) {
    const talent = await this.prisma.talent.findUnique({ where: { id } });
    if (!talent) {
      throw new NotFoundException(`Talento com ID #${id} não encontrado.`);
    }
    return talent;
  }

  // Atualiza um talento no catálogo
  async update(id: number, updateTalentDto: UpdateTalentDto) {
    await this.findOne(id); // Garante que o talento existe antes de atualizar
    return this.prisma.talent.update({
      where: { id },
      data: updateTalentDto,
    });
  }

  // Remove um talento do catálogo
  async remove(id: number) {
    await this.findOne(id); // Garante que o talento existe antes de remover
    return this.prisma.talent.delete({ where: { id } });
  }
}