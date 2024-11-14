import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <div class="input-section">
        <h2>Track Your Health</h2>
        <div class="input-grid">
          <div class="input-group">
            <label>Steps Taken</label>
            <input 
              type="number" 
              [(ngModel)]="healthData.steps" 
              (change)="updateData()"
              placeholder="Enter steps"
            >
          </div>
          <div class="input-group">
            <label>Calories Burned</label>
            <input 
              type="number" 
              [(ngModel)]="healthData.calories" 
              (change)="updateData()"
              placeholder="Enter calories"
            >
          </div>
          <div class="input-group">
            <label>Heart Rate (BPM)</label>
            <input 
              type="number" 
              [(ngModel)]="healthData.heartRate" 
              (change)="updateData()"
              placeholder="Enter heart rate"
            >
          </div>
          <div class="input-group">
            <label>Sleep Duration (hours)</label>
            <input 
              type="number" 
              [(ngModel)]="healthData.sleep" 
              (change)="updateData()"
              placeholder="Enter sleep hours"
            >
          </div>
          <div class="input-group">
            <label>Water Intake (ml)</label>
            <input 
              type="number" 
              [(ngModel)]="healthData.water" 
              (change)="updateData()"
              placeholder="Enter water intake"
            >
          </div>
        </div>
      </div>

      <div class="display-section">
        <div class="stat-card" *ngIf="healthData.steps">
          <i class="fas fa-walking"></i>
          <h3>Steps</h3>
          <p>{{healthData.steps}}</p>
        </div>
        <div class="stat-card" *ngIf="healthData.calories">
          <i class="fas fa-fire"></i>
          <h3>Calories</h3>
          <p>{{healthData.calories}} kcal</p>
        </div>
        <div class="stat-card" *ngIf="healthData.heartRate">
          <i class="fas fa-heartbeat"></i>
          <h3>Heart Rate</h3>
          <p>{{healthData.heartRate}} BPM</p>
        </div>
        <div class="stat-card" *ngIf="healthData.sleep">
          <i class="fas fa-bed"></i>
          <h3>Sleep</h3>
          <p>{{healthData.sleep}} hours</p>
        </div>
        <div class="stat-card" *ngIf="healthData.water">
          <i class="fas fa-tint"></i>
          <h3>Water</h3>
          <p>{{healthData.water}} ml</p>
        </div>
      </div>

      <div class="actions-section">
        <button class="save-btn" (click)="saveData()">
          <i class="fas fa-save"></i> Save Data
        </button>
        <button class="history-btn" (click)="viewHistory()">
          <i class="fas fa-history"></i> View History
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .input-section {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .input-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 0.5rem;
      color: #666;
    }

    input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    .display-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card i {
      font-size: 2rem;
      color: #4a90e2;
      margin-bottom: 1rem;
    }

    .stat-card h3 {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .stat-card p {
      font-size: 1.5rem;
      color: #333;
      font-weight: bold;
    }

    .actions-section {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .save-btn, .history-btn {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s;
    }

    .save-btn {
      background: #4a90e2;
      color: white;
    }

    .history-btn {
      background: #52c41a;
      color: white;
    }

    .save-btn:hover, .history-btn:hover {
      transform: translateY(-2px);
    }
  `]
})
export class DashboardComponent {
  healthData = {
    steps: 0,
    calories: 0,
    heartRate: 0,
    sleep: 0,
    water: 0
  };

  constructor(private router: Router) {}

  updateData() {
    // Here you would typically save the data to a backend
    console.log('Health data updated:', this.healthData);
  }

  saveData() {
    const record = {
      date: new Date(),
      ...this.healthData
    };

    // Get existing records from localStorage
    const existingRecords = JSON.parse(localStorage.getItem('healthRecords') || '[]');
    
    // Add new record
    existingRecords.push(record);
    
    // Save back to localStorage
    localStorage.setItem('healthRecords', JSON.stringify(existingRecords));
    
    // Reset form
    this.healthData = {
      steps: 0,
      calories: 0,
      heartRate: 0,
      sleep: 0,
      water: 0
    };

    alert('Data saved successfully!');
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }
} 