import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Notification {
  constructor(private snackBar: MatSnackBar) {}

  private defaultConfig: MatSnackBarConfig = {
    duration: 4000, // 4 seconds
    verticalPosition: 'top',
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-error']
    })
  }
}
