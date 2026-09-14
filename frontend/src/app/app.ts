import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pqr_web');
}
