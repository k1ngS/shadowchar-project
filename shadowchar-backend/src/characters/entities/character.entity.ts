import { type Character as CharacterModel } from 'generated/prisma';

export class Character implements CharacterModel {
  id: number;
  name: string;
  ancestry: string;
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
