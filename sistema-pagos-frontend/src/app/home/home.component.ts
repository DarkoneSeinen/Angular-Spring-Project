import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      description: 'Vista general del sistema y estadísticas',
      icon: 'dashboard',
      route: '/admin/dashboard',
      color: '#4CAF50'
    },
    {
      title: 'Estudiantes',
      description: 'Gestionar información de estudiantes',
      icon: 'school',
      route: '/admin/estudiantes',
      color: '#2196F3'
    },
    {
      title: 'Pagos',
      description: 'Ver y gestionar pagos',
      icon: 'payments',
      route: '/admin/pagos',
      color: '#FF9800'
    },
    {
      title: 'Cargar Estudiantes',
      description: 'Importar datos de estudiantes',
      icon: 'upload_file',
      route: '/admin/load-estudiantes',
      color: '#9C27B0'
    },
    {
      title: 'Cargar Pagos',
      description: 'Importar registros de pagos',
      icon: 'receipt_long',
      route: '/admin/load-pagos',
      color: '#F44336'
    },
    {
      title: 'Mi Perfil',
      description: 'Gestionar información personal',
      icon: 'person',
      route: '/admin/profile',
      color: '#607D8B'
    }
  ];

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return 'Buenos días';
    if (hours < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }
}
