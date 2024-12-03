import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../core/services/admin.service';
import { User } from '../core/models/auth.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h2>Admin Dashboard</h2>
      <div class="stats-cards">
        <div class="stat-card">
          <h3>Total Users</h3>
          <p>{{users.length}}</p>
        </div>
        <div class="stat-card">
          <h3>Active Users</h3>
          <p>{{getActiveUsers()}}</p>
        </div>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Last Active</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{user.id}}</td>
                <td>{{user.email}}</td>
                <td>{{user.lastActive | date:'medium'}}</td>
                <td>
                  <span [class]="'status-badge ' + user.status">
                    {{user.status}}
                  </span>
                </td>
                <td>
                  <button 
                    (click)="deleteUser(user)"
                    class="delete-btn"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .users-table {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }

    .status-badge.active {
      background: #e3fcef;
      color: #00a854;
    }

    .status-badge.banned {
      background: #fff1f0;
      color: #f5222d;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
    }

    .ban-btn {
      background: #ff4d4f;
      color: white;
    }

    .activate-btn {
      background: #52c41a;
      color: white;
    }

    .delete-btn {
      background: #ff4d4f;
      color: white;
    }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error: Error) => {
        console.error('Failed to load users:', error);
      }
    });
  }

  getActiveUsers(): number {
    return this.users.length;
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      this.adminService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: (error: Error) => {
          console.error('Failed to delete user:', error);
        }
      });
    }
  }
} 