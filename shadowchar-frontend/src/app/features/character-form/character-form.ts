import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterService } from '../character';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Notification } from '../../core/notification';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './character-form.html',
  styleUrl: './character-form.scss',
})
export class CharacterForm implements OnInit {
  characterForm: FormGroup;
  isEditMode = false;
  private characterId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: Notification,
  ) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      ancestry: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.characterId = +id;
            return this.characterService.getCharacterById(this.characterId);
          }
          return [];
        }),
      )
      .subscribe((character) => {
        if (character) {
          this.characterForm.patchValue(character);
        }
      });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      if (this.isEditMode && this.characterId) {
        this.characterService
          .updateCharacter(this.characterId, this.characterForm.value)
          .subscribe(() => {
            this.notificationService.showSuccess('Personagem atualizado com sucesso!');
            this.router.navigate(['/characters', this.characterId]);
          });
      } else {
        this.characterService.createCharacter(this.characterForm.value as any).subscribe(() => {
          this.notificationService.showSuccess('Personagem criado com sucesso!');
          this.router.navigate(['/characters']);
        });
      }
    }
  }
}
