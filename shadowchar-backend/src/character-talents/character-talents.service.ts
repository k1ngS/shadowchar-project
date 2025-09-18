import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface AttributePrerequisites {
  [key: string]: number;
}
interface Prerequisite {
  attributes?: AttributePrerequisites;
  talents?: string[];
}


@Injectable()
export class CharacterTalentsService {
  constructor(private prisma: PrismaService) {}

   /**
   * Valida se um personagem pode selecionar um determinado talento.
   * Esta é a sua função, agora integrada e privada ao serviço.
   */
  private async validateTalentSelection(
    characterId: number,
    talentId: number,
  ): Promise<{ valid: boolean; reason?: string }> {
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
      include: { talents: { include: { talent: true } } },
    });

    const talent = await this.prisma.talent.findUnique({
      where: { id: talentId },
    });

    if (!character || !talent) {
      return { valid: false, reason: 'Personagem ou Talento não encontrado.' };
    }

    // 1. Verifica se o personagem já possui o talento
    const hasTalent = character.talents.some((ct) => ct.talentId === talentId);
    if (hasTalent) {
      return { valid: false, reason: 'Personagem já possui este talento.' };
    }

    // 2. Verifica pré-requisitos
    const prerequisites: Prerequisite = (talent.prerequisite as any) || {};

    // 2a. Pré-requisitos de Atributo
    if (prerequisites.attributes) {
      for (const [attr, min] of Object.entries(prerequisites.attributes)) {
        if (character[attr] < min) {
          return {
            valid: false,
            reason: `Requer ${attr} de no mínimo ${min}.`,
          };
        }
      }
    }

    // 2b. Pré-requisitos de outros Talentos
    if (prerequisites.talents && Array.isArray(prerequisites.talents)) {
      const characterTalentKeys = character.talents.map((ct) => ct.talent.key);
      for (const requiredTalentKey of prerequisites.talents) {
        if (!characterTalentKeys.includes(requiredTalentKey)) {
          return {
            valid: false,
            reason: `Requer o talento: ${requiredTalentKey}.`,
          };
        }
      }
    }

    return { valid: true };
  }

  /**
   * Adiciona um talento a um personagem, APÓS VALIDAR os pré-requisitos.
   */
  async addTalentToCharacter(
    characterId: number,
    talentId: number,
    userId: number,
  ) {
    // Primeiro, verifica se o personagem pertence ao usuário (reutilizando a lógica do CharactersService)
    const character = await this.prisma.character.findUnique({ where: { id: characterId } });
    if (!character || character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este personagem.');
    }

    // AGORA, RODA A VALIDAÇÃO DE REGRAS DO JOGO
    const validation = await this.validateTalentSelection(characterId, talentId);
    if (!validation.valid) {
      // Se a validação falhar, lança um erro claro para o frontend
      throw new ForbiddenException(validation.reason);
    }

    // Se a validação passou, cria a ligação
    return this.prisma.characterTalent.create({
      data: { characterId, talentId, source: 'Player Choice' },
    });
  }

  /**
   * Retorna uma lista de todos os talentos, indicando se estão disponíveis para o personagem.
   * Esta é a sua função, agora integrada.
   */
  async getAvailableTalents(characterId: number, userId: number, tier?: string) {
    // Verifica a propriedade do personagem
    const character = await this.prisma.character.findUnique({
      where: { id: characterId },
      include: { talents: true },
    });
    if (!character || character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este personagem.');
    }

    // Busca todos os talentos (do catálogo mestre)
    const allTalents = await this.prisma.talent.findMany({
      where: tier ? { tier } : {},
    });

    // Filtra talentos que o personagem já possui
    const characterTalentIds = character.talents.map((ct) => ct.talentId);
    const potentialTalents = allTalents.filter(t => !characterTalentIds.includes(t.id));

    // Para cada talento potencial, verifica a disponibilidade
    const talentsWithAvailability = await Promise.all(
      potentialTalents.map(async (talent) => {
        const validation = await this.validateTalentSelection(characterId, talent.id);
        return {
          ...talent,
          available: validation.valid,
          reason: validation.reason || null, // Garante que a razão seja nula se for válido
        };
      })
    );

    return talentsWithAvailability;
  }

  // O método findAllByCharacter e removeTalentFromCharacter continuam os mesmos da resposta anterior
  async findAllByCharacter(characterId: number, userId: number) {
     const character = await this.prisma.character.findUnique({ where: { id: characterId } });
     if (!character || character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este personagem.');
     }
     return this.prisma.characterTalent.findMany({
      where: { characterId },
      include: { talent: true },
    });
  }

  async removeTalentFromCharacter(characterId: number, talentId: number, userId: number) {
    const character = await this.prisma.character.findUnique({ where: { id: characterId } });
     if (!character || character.ownerId !== userId) {
      throw new ForbiddenException('Acesso negado a este personagem.');
    }
    return this.prisma.characterTalent.delete({
      where: { characterId_talentId: { characterId, talentId } },
    });
  }
}