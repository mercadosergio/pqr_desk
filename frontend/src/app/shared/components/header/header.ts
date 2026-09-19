import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faClipboardList, faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  readonly homeIcon = faHouse;
  readonly listIcon = faClipboardList;
  readonly newPqrIcon = faPlus;
  readonly statisticsIcon = faChartSimple;
}
