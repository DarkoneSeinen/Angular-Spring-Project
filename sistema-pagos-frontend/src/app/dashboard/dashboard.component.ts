import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { forkJoin } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

// Register Chart.js plugins
import { CategoryScale, 
         LinearScale, 
         BarController, 
         BarElement, 
         ArcElement, 
         PieController, 
         Tooltip, 
         Legend } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  ArcElement,
  PieController,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  // Statistics
  totalStudents: number = 0;
  totalPayments: number = 0;
  monthlyRevenue: number = 0;
  pendingPayments: number = 0;

  // Bar Chart
  barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            return 'S/. ' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      }
    }
  };

  barChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Pagos Mensuales',
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        borderColor: '#2196F3',
        borderWidth: 1
      }
    ]
  };

  // Pie Chart
  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  pieChartData = {
    labels: ['Al día', 'Atrasados', 'Pendientes'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(76, 175, 80, 0.7)',
        'rgba(244, 67, 54, 0.7)',
        'rgba(255, 152, 0, 0.7)'
      ]
    }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    forkJoin({
      stats: this.dashboardService.getDashboardStats(),
      monthlyPayments: this.dashboardService.getMonthlyPayments(),
      paymentStatus: this.dashboardService.getPaymentStatus()
    }).subscribe({
      next: (data) => {
        // Update statistics
        this.totalStudents = data.stats.totalStudents;
        this.totalPayments = data.stats.totalPayments;
        this.monthlyRevenue = data.stats.monthlyRevenue;
        this.pendingPayments = data.stats.pendingPayments;

        // Update bar chart
        this.barChartData.datasets[0].data = data.monthlyPayments.amounts;
        this.chart?.update();

        // Update pie chart
        this.pieChartData.datasets[0].data = [
          data.paymentStatus.onTime,
          data.paymentStatus.late,
          data.paymentStatus.pending
        ];
        this.chart?.update();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
}
