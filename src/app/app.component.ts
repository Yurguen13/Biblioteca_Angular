import { Component } from '@angular/core';
import { RouterOutlet  } from '@angular/router';
import { CommonModule } from '@angular/common';   
import {  computed, signal } from '@angular/core';
import { LayoutComponent } from "./layout/layout.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterOutlet, LayoutComponent],
   
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca';

    mobileOpen = signal(false);
  profileOpen = signal(false);

  toggleMobile() { this.mobileOpen.update(v => !v); }
  closeMobile()  { this.mobileOpen.set(false); }

  toggleProfile() { this.profileOpen.update(v => !v); }
  closeProfile()  { this.profileOpen.set(false); }

  // accesibilidad
  ariaExpandedMobile = computed(() => String(this.mobileOpen()));
  ariaExpandedProfile = computed(() => String(this.profileOpen()));
}
