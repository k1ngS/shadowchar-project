import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CharacterTalent, Talent, TalentService } from '../talent';

@Component({
  selector: 'app-talent-manager',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './talent-manager.html',
  styleUrl: './talent-manager.scss',
})
export class TalentManager implements OnInit {
  @Input() characterId!: number;

  characterTalents$!: Observable<CharacterTalent[]>;
  availableTalents$!: Observable<Talent[]>;

  talentForm: FormGroup;

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private talentService: TalentService,
    private fb: FormBuilder,
  ) {
    this.talentForm = this.fb.group({
      talentId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.characterTalents$ = this.refresh$.pipe(
      switchMap(() => this.talentService.getTalentsForCharacter(this.characterId)),
    );

    this.availableTalents$ = this.refresh$.pipe(
      switchMap(() => this.talentService.getAvailableTalents(this.characterId)),
    );
  }

  onSubmit(): void {
    if (this.talentForm.invalid) {
      return;
    }

    const selectedTalentId = this.talentForm.value.talentId;

    this.talentService.addTalentToCharacter(this.characterId, selectedTalentId)
      .subscribe(() => {
        this.talentForm.reset();
        this.refresh$.next();
      });
  }

  onRemoveTalent(talentId: number): void {
    if (confirm('Tem certeza que deseja remover este talento?')) {
      this.talentService.removeTalentFromCharacter(this.characterId, talentId)
        .subscribe(() => {
          this.refresh$.next();
        });
    }
  }
}
