import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule, HttpClientModule],
  standalone: true,
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loginError: boolean = false;
  loginSuccess: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/login', loginData).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso', response);
        this.loginSuccess = true;
        this.loginError = false;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao registrar usuário', error);
        this.loginError = true;
        this.loginSuccess = false;
      }
    );
  }
}
