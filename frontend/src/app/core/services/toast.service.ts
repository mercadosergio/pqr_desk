import { Injectable, Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../shared/models/interfaces/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' = 'success', duration = 3000) {
    const newToast: Toast = { id: Date.now(), message, type, duration };
    this._toasts.next([...this._toasts.getValue(), newToast]);
    setTimeout(() => this.remove(newToast.id), duration);
  }

  remove(id: number) {
    this._toasts.next(this._toasts.getValue().filter((t) => t.id !== id));
  }
}
