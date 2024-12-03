import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HealthService } from '../core/services/health.service';
import { HealthRecord } from '../core/models/health.model';

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

      <div class="graphs-section">
        <h2>Health Trends</h2>
        <div class="graph-container">
          <div class="graph">
            <h3>Steps Progress</h3>
            <div class="bar-graph">
              <div class="bar" 
                   [style.height.%]="(healthData.steps / 10000) * 100"
                   [title]="healthData.steps + ' steps'">
              </div>
              <div class="target-line" title="Target: 10,000 steps"></div>
            </div>
            <span class="label">Today</span>
          </div>

          <div class="graph">
            <h3>Calories Burned</h3>
            <div class="bar-graph">
              <div class="bar" 
                   [style.height.%]="(healthData.calories / 2500) * 100"
                   [title]="healthData.calories + ' calories'">
              </div>
              <div class="target-line" title="Target: 2,500 calories"></div>
            </div>
            <span class="label">Today</span>
          </div>

          <div class="graph">
            <h3>Heart Rate</h3>
            <div class="bar-graph">
              <div class="bar" 
                   [style.height.%]="(healthData.heartRate / 180) * 100"
                   [class.warning]="healthData.heartRate > 100"
                   [title]="healthData.heartRate + ' BPM'">
              </div>
            </div>
            <span class="label">Current</span>
          </div>

          <div class="graph">
            <h3>Sleep Duration</h3>
            <div class="bar-graph">
              <div class="bar" 
                   [style.height.%]="(healthData.sleep / 9) * 100"
                   [title]="healthData.sleep + ' hours'">
              </div>
              <div class="target-line" title="Target: 8 hours"></div>
            </div>
            <span class="label">Last Night</span>
          </div>

          <div class="graph">
            <h3>Water Intake</h3>
            <div class="bar-graph">
              <div class="bar" 
                   [style.height.%]="(healthData.water / 2500) * 100"
                   [title]="healthData.water + ' ml'">
              </div>
              <div class="target-line" title="Target: 2,500 ml"></div>
            </div>
            <span class="label">Today</span>
          </div>
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

    .graphs-section {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;
    }

    .graph-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }

    .graph {
      text-align: center;
    }

    .graph h3 {
      margin-bottom: 1rem;
      font-size: 1rem;
      color: #666;
    }

    .bar-graph {
      height: 200px;
      background: #f5f5f5;
      border-radius: 5px;
      position: relative;
      margin: 0 auto;
      width: 40px;
    }

    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #4a90e2;
      border-radius: 5px;
      transition: height 0.3s ease;
      min-height: 1px;
    }

    .bar.warning {
      background: #ff4d4f;
    }

    .target-line {
      position: absolute;
      bottom: 80%;
      left: -10px;
      right: -10px;
      height: 2px;
      background: #52c41a;
    }

    .label {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #666;
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

  constructor(
    private router: Router,
    private healthService: HealthService
  ) {}

  updateData() {
  }

  saveData() {
    const record: HealthRecord = {
      date: new Date(),
      ...this.healthData
    };

    this.healthService.saveRecord(record).subscribe({
      next: () => {
        alert('Data saved successfully!');
        this.resetForm();
      },
      error: (error: Error) => {
        console.error('Failed to save data:', error);
        alert('Failed to save data. Please try again.');
      }
    });
  }

  private resetForm() {
    this.healthData = {
      steps: 0,
      calories: 0,
      heartRate: 0,
      sleep: 0,
      water: 0
    };
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }
} 