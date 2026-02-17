import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  hideNav: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // initial visibility check
    this.updateVisibility(this.router.url);

    // update on navigation end
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.updateVisibility(event.urlAfterRedirects);
      }
    });
  }

  private updateVisibility(url: string) {
    const path = (url || '').toLowerCase();
    this.hideNav = path.includes('/signin') || path.includes('/signup');
  }
}
