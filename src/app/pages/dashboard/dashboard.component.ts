import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('gaugeCanvas', { static: false }) gaugeCanvas?: ElementRef<HTMLCanvasElement>;

  public recibosTotal = 1000;
  public descargasTotal = 700;
  public cumplimientoTotal = 76;


  public gaugeValue = 76; 
  public gaugeMax = 100;
  public gaugeMin = 0;
  private currentAnimatedValue = 0; 
  private animationId?: number;

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Ecotecnias', 'Mendoza', 'San Luis Potosí', 'Puebla'],
    datasets: [{
      data: [300, 300, 300, 100],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0'] as string[],
      hoverBackgroundColor: ['#45a049', '#1976D2', '#FFA000', '#7B1FA2'] as string[]
    }]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%'
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        data: [64241, 1543, 3848, 938, 2500, 1800, 3200, 2100, 4500, 3800, 2900, 1500],
        label: 'Recibos emitidos',
        fill: true,
        tension: 0.4,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#4CAF50'
      },
      {
        data: [45000, 1200, 2500, 800, 1900, 1500, 2800, 1800, 3500, 2900, 2100, 1200],
        label: 'Descargas',
        fill: true,
        tension: 0.4,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#2196F3',
        pointBorderColor: '#2196F3'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#e3e3e3',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 13
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e3e3e3',
          font: {
            size: 12
          }
        }
      },
      x: {
        border: {
          display: false
        },
        grid: {
          display: false
        },
        ticks: {
          color: '#e3e3e3',
          font: {
            size: 12
          }
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  public summaryData = [
    { sucursal: 'Ecotecnias', recibos: 300, descargas: 150, cumplimiento: '50%', color: '#4CAF50' },
    { sucursal: 'Mendoza', recibos: 300, descargas: 300, cumplimiento: '100%', color: '#2196F3' },
    { sucursal: 'San Luis Potosí', recibos: 300, descargas: 165, cumplimiento: '55%', color: '#FFC107' },
    { sucursal: 'Puebla', recibos: 100, descargas: 40, cumplimiento: '40%', color: '#9C27B0' }
  ];

  public requestsUsed = 266;
  public requestsLimit = 500;
  public spentAmount = 0;
  public teamSpendLimit = 50;

  public metrics = {
    edits: 7145,
    tabs: 166,
    chats: 75
  };

  public timePeriods = [
    { label: '1d', active: false },
    { label: '7d', active: false },
    { label: '30d', active: false },
    { label: 'Este mes', active: true }
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateGauge();
    }, 0);
  }

  animateGauge(): void {
    if (!this.gaugeCanvas?.nativeElement) {
      console.warn('Canvas element not available yet');
      return;
    }

    const duration = 2000; 
    const startTime = Date.now();
    const targetValue = this.gaugeValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      this.currentAnimatedValue = targetValue * easedProgress;
      this.drawGauge();

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  drawGauge(): void {
    if (!this.gaugeCanvas?.nativeElement) {
      console.warn('Canvas element not available yet');
      return;
    }

    const canvas = this.gaugeCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height - 35; 
    const radius = 60; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawGaugeBackground(ctx, centerX, centerY, radius);
    
    this.drawGaugeTicks(ctx, centerX, centerY, radius);
    
    this.drawGaugeNeedle(ctx, centerX, centerY, radius);
    
    this.drawGaugeValue(ctx, centerX, centerY);
  }

  private drawGaugeBackground(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 8; 
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    const progressAngle = startAngle + (this.currentAnimatedValue / this.gaugeMax) * Math.PI;
    
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, '#FF471A');
    gradient.addColorStop(0.5, '#FFC107');
    gradient.addColorStop(1, '#4CAF50');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, progressAngle);
    ctx.lineWidth = 8; 
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

  private drawGaugeTicks(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.font = '8px Arial'; 
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI + (i / 10) * Math.PI;
      const value = (this.gaugeMax / 10) * i;
      
      const x1 = centerX + Math.cos(angle) * (radius - 4);
      const y1 = centerY + Math.sin(angle) * (radius - 4);
      const x2 = centerX + Math.cos(angle) * (radius - 8);
      const y2 = centerY + Math.sin(angle) * (radius - 8);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (i % 5 === 0) {
        const textX = centerX + Math.cos(angle) * (radius - 16); 
        const textY = centerY + Math.sin(angle) * (radius - 16) + 2; 
        ctx.fillText(value.toString(), textX, textY);
      }
    }
  }

  private drawGaugeNeedle(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    const percentage = this.currentAnimatedValue / this.gaugeMax;
    const angle = Math.PI + percentage * Math.PI;
    
    const needleLength = radius - 12; 
    const needleX = centerX + Math.cos(angle) * needleLength;
    const needleY = centerY + Math.sin(angle) * needleLength;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private drawGaugeValue(ctx: CanvasRenderingContext2D, centerX: number, centerY: number): void {

    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(this.currentAnimatedValue)}%`, centerX, centerY + 25); 
    
  }

  selectTimePeriod(period: any): void {
    this.timePeriods.forEach(p => p.active = false);
    period.active = true;
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
