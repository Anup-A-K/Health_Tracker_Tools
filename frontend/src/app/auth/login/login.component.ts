import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest, LoginResponse } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-type-toggle">
          <button 
            [class.active]="authType === 'user'"
            (click)="switchToUser()"
          >
            User Login
          </button>
          <button 
            [class.active]="authType === 'admin'"
            (click)="switchToAdmin()"
          >
            Admin Login
          </button>
        </div>

        <h2>{{ getAuthTitle() }}</h2>
        
        @if (errorMessage) {
          <div class="error-message">
            {{ errorMessage }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
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
              minlength="5"
              #passwordInput="ngModel"
              [class.invalid]="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)"
            >
            @if (passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)) {
              <div class="validation-error">
                @if (passwordInput.errors?.['required']) {
                  <span>Password is required</span>
                }
                @if (passwordInput.errors?.['minlength']) {
                  <span>Password must be at least 5 characters</span>
                }
              </div>
            }
          </div>
          @if (authType === 'admin') {
            <div class="form-group">
              <input 
                type="password" 
                [(ngModel)]="adminCode" 
                name="adminCode" 
                placeholder="Admin Access Code"
                required
                #adminCodeInput="ngModel"
                [class.invalid]="adminCodeInput.invalid && (adminCodeInput.dirty || adminCodeInput.touched)"
              >
              @if (adminCodeInput.invalid && (adminCodeInput.dirty || adminCodeInput.touched)) {
                <div class="validation-error">
                  <span>Admin access code is required</span>
                </div>
              }
            </div>
          }
          <button 
            type="submit" 
            class="submit-btn"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>
          <div class="register-link">
            Don't have an account? <a routerLink="/register">Register</a>
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
    
    .auth-type-toggle {
      display: flex;
      margin-bottom: 1.5rem;
      background: #f5f7fa;
      padding: 0.3rem;
      border-radius: 5px;
    }

    .auth-type-toggle button {
      flex: 1;
      padding: 0.8rem;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .auth-type-toggle button.active {
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: #4a90e2;
    }
    
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .error-message {
      background-color: #fff2f0;
      border: 1px solid #ffccc7;
      color: #ff4d4f;
      padding: 0.8rem;
      border-radius: 5px;
      margin-bottom: 1rem;
      text-align: center;
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
    }
    
    .submit-btn:hover {
      background: #357abd;
    }

    .register-link {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }

    .register-link a {
      color: #4a90e2;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
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
export class LoginComponent {
  authType: 'user' | 'admin' = 'user';
  email = '';
  password = '';
  adminCode = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  switchToUser() {
    this.authType = 'user';
    this.resetForm();
  }

  switchToAdmin() {
    this.authType = 'admin';
    this.resetForm();
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.adminCode = '';
    this.errorMessage = null;
  }

  getAuthTitle(): string {
    return this.authType === 'admin' ? 'Admin Login' : 'User Login';
  }

  onSubmit() {
    this.errorMessage = null;
    const request: LoginRequest = {
      email: this.email,
      password: this.password,
      adminCode: this.authType === 'admin' ? this.adminCode : undefined
    };

    const login$ = this.authType === 'admin' 
      ? this.authService.adminLogin(request)
      : this.authService.login(request);

    login$.subscribe({
      next: (response: LoginResponse) => {
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = this.authType === 'admin' 
            ? 'Invalid admin credentials or access code'
            : 'Invalid email or password';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    });
  }
} 