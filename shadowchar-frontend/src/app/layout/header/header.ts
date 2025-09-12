import { Component } from '@angular/core';
import { Auth } from '../../core/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public authService: Auth) {}

  logout(): void {
    this.authService.logout();
  }
}
