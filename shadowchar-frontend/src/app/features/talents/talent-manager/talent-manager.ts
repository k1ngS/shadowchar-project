import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Talent, TalentService } from '../talent';

@Component({
  selector: 'app-talent-manager',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './talent-manager.html',
  styleUrl: './talent-manager.scss',
})
export class TalentManager implements OnInit {
  @Input() characterId!: number;

  talents$!: Observable<Talent[]>;
  talentForm: FormGroup;

  private refreshTalents$ = new BehaviorSubject<void>(undefined);

  constructor(
    private talentService: TalentService,
    private fb: FormBuilder,
  ) {
    this.talentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.talents$ = this.refreshTalents$.pipe(
      switchMap(() => this.talentService.getTalentsForCharacter(this.characterId)),
    );
  }

  onSubmit(): void {
    if (this.talentForm.valid) {
      this.talentService
        .addTalentToCharacter(this.characterId, this.talentForm.value)
        .subscribe(() => {
          this.talentForm.reset();
          this.refreshTalents$.next();
        });
    }
  }
}
