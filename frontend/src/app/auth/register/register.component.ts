import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Create Account</h2>
        @if (errorMessage) {
          <div class="error-message">
            {{ errorMessage }}
          </div>
        }
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email" 
              placeholder="Email"
              required
              email
              #emailInput="ngModel"
              [class.invalid]="emailInput.invalid && (emailInput.dirty || emailInput.touched)"
            >
            @if (emailInput.invalid && (emailInput.dirty || emailInput.touched)) {
              <div class="validation-error">
                @if (emailInput.errors?.['required']) {
                  <span>Email is required</span>
                }
                @if (emailInput.errors?.['email']) {
                  <span>Please enter a valid email</span>
                }
              </div>
            }
          </div>
          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              placeholder="Password"
              required
              minlength="6"
              #passwordInput="ngModel"
              [class.invalid]="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)"
            >
            @if (passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)) {
              <div class="validation-error">
                @if (passwordInput.errors?.['required']) {
                  <span>Password is required</span>
                }
                @if (passwordInput.errors?.['minlength']) {
                  <span>Password must be at least 6 characters</span>
                }
              </div>
            }
          </div>
          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm Password"
              required
              [pattern]="password"
              #confirmInput="ngModel"
              [class.invalid]="confirmInput.invalid && (confirmInput.dirty || confirmInput.touched)"
            >
            @if (confirmInput.invalid && (confirmInput.dirty || confirmInput.touched)) {
              <div class="validation-error">
                @if (confirmInput.errors?.['required']) {
                  <span>Please confirm your password</span>
                }
                @if (confirmInput.errors?.['pattern']) {
                  <span>Passwords do not match</span>
                }
              </div>
            }
          </div>
          <button 
            type="submit" 
            class="submit-btn"
            [disabled]="registerForm.invalid"
          >
            Register
          </button>
          <div class="login-link">
            Already have an account? <a routerLink="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .auth-box {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus {
      outline: none;
      border-color: #4a90e2;
    }
    
    .submit-btn {
      width: 100%;
      padding: 0.8rem;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
      margin-bottom: 1rem;
    }
    
    .submit-btn:hover {
      background: #357abd;
    }

    .error-message {
      color: #ff4d4f;
      text-align: center;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #fff1f0;
      border-radius: 4px;
    }

    .login-link {
      text-align: center;
      color: #666;
    }

    .login-link a {
      color: #4a90e2;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .invalid {
      border-color: #ff4d4f !important;
    }

    .validation-error {
      color: #ff4d4f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.errorMessage = null;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const request: RegisterRequest = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
} 