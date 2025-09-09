import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  private readonly characters = [
    {
      id: 1,
      name: 'Elara, a Veloz',
      ancestry: 'Humano',
    },
    {
      id: 2,
      name: 'Grom, Punho de Pedra',
      ancestry: 'Orc',
    },
    {
      id: 3,
      name: 'Sylas, o Sábio',
      ancestry: 'Elfo',
    },
  ];

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return this.characters;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
