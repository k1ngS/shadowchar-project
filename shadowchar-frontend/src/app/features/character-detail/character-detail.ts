import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Character, CharacterService } from '../character';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss',
})
export class CharacterDetail implements OnInit {
  character$!: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.character$ = this.characterService.getCharacterById(id);
  }
}
