import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatListModule, RouterModule, CommonModule],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})

export class AdminTemplateComponent {

  constructor(public authService: AuthService){

  }

  logout() {
    this.authService.logout();
  }

}
