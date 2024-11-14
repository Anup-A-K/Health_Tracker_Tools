import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  email: string;
  lastActive: Date;
  status: 'active' | 'banned';
}

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
                    (click)="toggleUserStatus(user)"
                    [class]="user.status === 'active' ? 'ban-btn' : 'activate-btn'"
                  >
                    {{user.status === 'active' ? 'Ban' : 'Activate'}}
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
  `]
})
export class AdminComponent {
  users: User[] = [
    { id: 1, email: 'user1@example.com', lastActive: new Date(), status: 'active' },
    { id: 2, email: 'user2@example.com', lastActive: new Date(), status: 'active' },
    { id: 3, email: 'user3@example.com', lastActive: new Date(), status: 'banned' },
  ];

  getActiveUsers(): number {
    return this.users.filter(user => user.status === 'active').length;
  }

  toggleUserStatus(user: User) {
    user.status = user.status === 'active' ? 'banned' : 'active';
  }
} 