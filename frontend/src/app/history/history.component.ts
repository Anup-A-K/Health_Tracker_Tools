import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../core/services/health.service';
import { HealthRecord } from '../core/models/health.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h2>Health History</h2>
      <div class="trends-section">
        <h2>Health Trends</h2>
        <div class="trend-graphs">
          @for (metric of metrics; track metric.name) {
            <div class="trend-graph">
              <h3>{{metric.name}}</h3>
              <div class="plot-container">
                <div class="y-axis">
                  <span>{{metric.max}}</span>
                  <span>{{metric.max/2}}</span>
                  <span>0</span>
                </div>
                <div class="plot-area">
                  @for (value of getValues(metric.key); track $index) {
                    <div class="plot-point" 
                         [style.left.%]="($index / (healthRecords.length - 1)) * 100"
                         [style.bottom.%]="(value / metric.max) * 100"
                         [title]="value + ' ' + metric.unit">
                      <div class="point"></div>
                      <div class="value-label">{{value}}</div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      
      <div class="records-grid">
        @for (record of healthRecords; track record.date) {
          <div class="record-card">
            <div class="record-header">
              <span class="date">{{record.date | date:'medium'}}</span>
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

    .trends-section {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .trend-graphs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }

    .trend-graph h3 {
      text-align: center;
      margin-bottom: 1rem;
      color: #666;
    }

    .plot-container {
      height: 200px;
      position: relative;
      margin: 20px 40px;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    .y-axis {
      position: absolute;
      left: -40px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #666;
      font-size: 0.75rem;
    }

    .plot-area {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .plot-point {
      position: absolute;
      transform: translate(-50%, 50%);
    }

    .point {
      width: 8px;
      height: 8px;
      background: #4a90e2;
      border-radius: 50%;
      position: relative;
    }

    .point::after {
      content: '';
      position: absolute;
      bottom: -100px;
      left: 50%;
      width: 1px;
      height: 100px;
      background: #e8e8e8;
      z-index: -1;
    }

    .value-label {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.75rem;
      color: #666;
      white-space: nowrap;
    }

    .trend-graph {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class HistoryComponent implements OnInit {
  healthRecords: HealthRecord[] = [];
  metrics = [
    { name: 'Steps', key: 'steps', max: 10000, unit: 'steps' },
    { name: 'Calories', key: 'calories', max: 2500, unit: 'kcal' },
    { name: 'Heart Rate', key: 'heartRate', max: 180, unit: 'BPM' },
    { name: 'Sleep', key: 'sleep', max: 9, unit: 'hours' },
    { name: 'Water', key: 'water', max: 2500, unit: 'ml' }
  ];

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadRecords();
  }

  getValues(key: string): number[] {
    return this.healthRecords.map(record => record[key as keyof HealthRecord] as number);
  }

  private loadRecords() {
    this.healthService.getRecords().subscribe({
      next: (records: HealthRecord[]) => {
        this.healthRecords = records;
      },
      error: (error: Error) => {
        console.error('Failed to load records:', error);
      }
    });
  }
} 