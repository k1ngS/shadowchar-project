import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Character, CharacterService } from '../character';
import { TalentManager } from '../talents/talent-manager/talent-manager';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    TalentManager,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
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
