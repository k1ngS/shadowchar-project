import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { CharacterForm } from './features/character-form/character-form';
import { CharacterDetail } from './features/character-detail/character-detail';

export const routes: Routes = [
  { path: 'characters/new', component: CharacterForm },
  { path: 'characters/:id/edit', component: CharacterForm },
  { path: 'characters/:id', component: CharacterDetail },
  { path: 'characters', component: CharacterList },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
];
