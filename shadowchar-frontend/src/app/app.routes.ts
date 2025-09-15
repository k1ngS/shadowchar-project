import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { CharacterForm } from './features/character-form/character-form';
import { CharacterDetail } from './features/character-detail/character-detail';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/auth-guard';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'characters/new', component: CharacterForm, canActivate: [authGuard] },
  { path: 'characters/:id/edit', component: CharacterForm, canActivate: [authGuard] },
  { path: 'characters/:id', component: CharacterDetail, canActivate: [authGuard] },
  { path: 'characters', component: CharacterList, canActivate: [authGuard] },

  { path: '', redirectTo: '/characters', pathMatch: 'full' },
];
