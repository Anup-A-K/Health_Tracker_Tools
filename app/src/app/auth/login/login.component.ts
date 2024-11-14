import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email" 
              placeholder="Email"
              required
            >
          </div>
          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              placeholder="Password"
              required
            >
          </div>
          @if (authType === 'admin') {
            <div class="form-group">
              <input 
                type="password" 
                [(ngModel)]="adminCode" 
                name="adminCode" 
                placeholder="Admin Access Code"
                required
              >
            </div>
          }
          <button type="submit" class="submit-btn">Login</button>
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
  `]
})
export class LoginComponent {
  authType: 'user' | 'admin' = 'user';
  email = '';
  password = '';
  adminCode = '';

  constructor(private router: Router) {}

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
  }

  getAuthTitle(): string {
    return this.authType === 'admin' ? 'Admin Login' : 'User Login';
  }

  onSubmit() {
    if (this.authType === 'admin') {
      // Navigate to admin page regardless of input
      this.router.navigate(['/admin']);
    } else {
      // Navigate to dashboard regardless of input
      this.router.navigate(['/dashboard']);
    }
  }
} 