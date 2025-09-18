import { type Character as CharacterModel } from '@prisma/client';

export class Character implements CharacterModel {
  id: number;
  name: string;
  ancestry: string;
  level: number;
  strength: number;
  agility: number;
  intellect: number;
  will: number;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;

  health: number;
  insanity: number;
  corruption: number;
  defense: number;
}
