import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({ // el form builder se encarga de crear el formulario reactivo
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }

  login(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth: boolean = this.authService.login(username, password);
    if (auth) {
      this.router.navigateByUrl('/admin');
    }
  }
}
