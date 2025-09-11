import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterService } from '../character';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList implements OnInit {
  public characters$!: Observable<Character[]>;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characters$ = this.characterService.getCharacters();
  }

  deleteCharacter(id: number): void {
    const confirmation = confirm('Tem certeza que deseja deletar este personagem?');

    if (confirmation) {
      this.characterService.deleteCharacter(id).subscribe(() => {
        console.log('Personagem deletado com sucesso');
        this.loadCharacters();
      });
    }
  }
}
