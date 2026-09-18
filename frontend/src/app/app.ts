import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  imports: [RouterOutlet, Header, ToastComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pqr_web');
}
