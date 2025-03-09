import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: `
    <div class="layout-topbar">
  <div class="layout-topbar-logo-container">
    <!-- Logo e pulsante del menu -->
    <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>
    <a class="layout-topbar-logo" routerLink="/">
      <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG del logo -->
      </svg>
      <span>ORDERSLAND</span>
    </a>
  </div>

  <div class="layout-topbar-actions">
    <!-- Pulsanti per il cambio di lingua -->
    <div class="language-switcher">
      <button
        type="button"
        class="layout-topbar-action"
        (click)="changeLanguage('it')"
        [ngClass]="{ 'active': currentLang === 'it' }"
      >
        IT
      </button>
      <button
        type="button"
        class="layout-topbar-action"
        (click)="changeLanguage('en')"
        [ngClass]="{ 'active': currentLang === 'en' }"
      >
        EN
      </button>
    </div>

    <!-- Pulsante per il tema scuro -->
    <div class="layout-config-menu">
      <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
      </button>
      <div class="relative">
        <button
          class="layout-topbar-action layout-topbar-action-highlight"
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveToClass="hidden"
          leaveActiveClass="animate-fadeout"
          [hideOnOutsideClick]="true"
        >
          <i class="pi pi-palette"></i>
        </button>
        <app-configurator />
      </div>
    </div>

    <!-- Altri pulsanti dell'header -->
    <button
      class="layout-topbar-menu-button layout-topbar-action"
      pStyleClass="@next"
      enterFromClass="hidden"
      enterActiveClass="animate-scalein"
      leaveToClass="hidden"
      leaveActiveClass="animate-fadeout"
      [hideOnOutsideClick]="true"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu hidden lg:block">
        <button type="button" class="layout-topbar-action">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
    </div>
  </div>
</div>
    `
})
export class AppTopbar implements OnInit {
    items!: MenuItem[];
    currentLang: string = 'it'; // Lingua predefinita

    constructor(
      public layoutService: LayoutService,
      private translocoService: TranslocoService
    ) {}

    ngOnInit() {
      // Recupera la lingua preferita dall'utente (se salvata)
      const userLang = localStorage.getItem('userLang') || 'it';
      this.currentLang = userLang;
      this.translocoService.setActiveLang(userLang);
    }

    // Cambia la lingua
    changeLanguage(lang: string) {
      this.currentLang = lang;
      this.translocoService.setActiveLang(lang); // Imposta la lingua attiva
      localStorage.setItem('userLang', lang); // Salva la lingua preferita
    }

    // Toggle per il tema scuro
    toggleDarkMode() {
      this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
  }
