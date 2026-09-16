import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  imports: [ListComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export default class HomePage {}
