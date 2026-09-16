import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  imports: [RouterLinkWithHref],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
