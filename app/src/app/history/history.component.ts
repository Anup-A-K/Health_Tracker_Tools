import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HealthRecord {
  date: Date;
  steps: number;
  calories: number;
  heartRate: number;
  sleep: number;
  water: number;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h2>Health History</h2>
      <div class="records-grid">
        @for (record of healthRecords; track record.date) {
          <div class="record-card">
            <div class="record-header">
              <span class="date">{{record.date | date:'medium'}}</span>
              <button class="delete-btn" (click)="deleteRecord(record)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="record-details">
              <div class="detail-item">
                <i class="fas fa-walking"></i>
                <span>Steps: {{record.steps}}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-fire"></i>
                <span>Calories: {{record.calories}} kcal</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-heartbeat"></i>
                <span>Heart Rate: {{record.heartRate}} BPM</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-bed"></i>
                <span>Sleep: {{record.sleep}} hours</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-tint"></i>
                <span>Water: {{record.water}} ml</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .history-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .records-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .record-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }

    .record-header {
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .date {
      color: #666;
      font-size: 0.9rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
    }

    .detail-item i {
      color: #4a90e2;
      margin-right: 0.5rem;
      width: 20px;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #ff4444;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .delete-btn:hover {
      background-color: rgba(255, 68, 68, 0.1);
    }
  `]
})
export class HistoryComponent {
  healthRecords: HealthRecord[] = [];

  constructor() {
    const mockData = localStorage.getItem('healthRecords');
    this.healthRecords = mockData ? JSON.parse(mockData) : [];
  }

  deleteRecord(recordToDelete: HealthRecord) {
    this.healthRecords = this.healthRecords.filter(record => 
      new Date(record.date).getTime() !== new Date(recordToDelete.date).getTime()
    );
    localStorage.setItem('healthRecords', JSON.stringify(this.healthRecords));
  }
} 