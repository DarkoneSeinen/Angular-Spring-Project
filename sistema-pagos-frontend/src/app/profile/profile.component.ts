import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    phone: ''
  };
  
  userPhotoUrl: string = '';
  isEditing: boolean = false;
  totalPayments: number = 0;
  lastPayment: Date | null = null;
  private originalUser: User | null = null;

  constructor() { }

  ngOnInit(): void {
    // TODO: Fetch user data from a service
    // This is mock data, replace with actual service call
    this.user = {
      name: 'Usuario de Ejemplo',
      email: 'usuario@ejemplo.com',
      phone: '123-456-7890'
    };
    this.originalUser = { ...this.user };
    this.totalPayments = 5; // Mock data
    this.lastPayment = new Date(); // Mock data
  }

  toggleEdit(): void {
    if (this.isEditing) {
      // Save changes
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  cancelEdit(): void {
    if (this.originalUser) {
      this.user = { ...this.originalUser };
    }
    this.isEditing = false;
  }

  private saveChanges(): void {
    // TODO: Implement actual save logic with a service
    this.originalUser = { ...this.user };
    console.log('Saving user data:', this.user);
  }
}
