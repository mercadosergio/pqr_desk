import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { Toast } from '../../models/interfaces/toast.interface';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'app-toast',
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toasts: Toast[] = [];

  private toastService = inject(ToastService);

  constructor() {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }
}
