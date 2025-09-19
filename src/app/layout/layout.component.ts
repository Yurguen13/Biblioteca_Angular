import { Component } from '@angular/core';
import { RouterModule,RouterLink, RouterLinkActive } from '@angular/router';

import { CommonModule } from '@angular/common';   
import {  computed, signal } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,  RouterLink, RouterLinkActive], // <-- a
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

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
