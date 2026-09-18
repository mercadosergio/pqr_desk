import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  show(message: string, type: 'success' | 'error' | 'warning' = 'success', duration = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: [`app-snackbar-${type}`],
    });
  }
}
