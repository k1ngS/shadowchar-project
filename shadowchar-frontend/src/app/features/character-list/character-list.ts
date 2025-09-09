import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterService } from '../character';

@Component({
  selector: 'app-character-list',
  imports: [AsyncPipe],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss'
})
export class CharacterList implements OnInit {
  public characters$!: Observable<Character[]>;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characters$ = this.characterService.getCharacters();
  }
}
