import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
