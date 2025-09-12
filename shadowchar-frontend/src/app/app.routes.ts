import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { CharacterForm } from './features/character-form/character-form';
import { CharacterDetail } from './features/character-detail/character-detail';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },

  { path: 'characters/new', component: CharacterForm },
  { path: 'characters/:id/edit', component: CharacterForm },
  { path: 'characters/:id', component: CharacterDetail },
  { path: 'characters', component: CharacterList },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
];
