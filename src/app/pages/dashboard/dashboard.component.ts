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

  private originalColors = ['#87A9BE', '#87A9BE', '#87A9BE', '#87A9BE'];
  private defaultGrayColor = 'rgba(255, 255, 255, 0.065)';

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Ecotecnias', 'Mendoza', 'San Luis Potosí', 'Puebla'],
    datasets: [{
      data: [300, 200, 300, 100],
      backgroundColor: [this.defaultGrayColor, this.defaultGrayColor, this.defaultGrayColor, this.defaultGrayColor] as string[],
      hoverBackgroundColor: ['#87A9BE', '#87A9BE', '#87A9BE', '#87A9BE'] as string[],
      borderWidth: 0,
      spacing: 10
    }]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'point',
      intersect: true
    },
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '70%',
    animation: {
      duration: 300,
      easing: 'easeOutQuart'
    }
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

  public summaryData: any[] = [];

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

  ngOnInit(): void {
    this.summaryData = [
      { sucursal: 'Ecotecnias', recibos: this.doughnutChartData.datasets[0].data[0], descargas: this.doughnutChartData.datasets[0].data[1], cumplimiento: '50%', color: this.originalColors[0] },
      { sucursal: 'Mendoza', recibos: this.doughnutChartData.datasets[0].data[1], descargas: this.doughnutChartData.datasets[0].data[2], cumplimiento: '100%', color: this.originalColors[1] },
      { sucursal: 'San Luis Potosí', recibos: this.doughnutChartData.datasets[0].data[2], descargas: this.doughnutChartData.datasets[0].data[3], cumplimiento: '55%', color: this.originalColors[2] },
      { sucursal: 'Puebla', recibos: this.doughnutChartData.datasets[0].data[3], descargas: this.doughnutChartData.datasets[0].data[4], cumplimiento: '40%', color: this.originalColors[3] }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateGauge();
    }, 0);
    
    // Asegurar que el chart esté listo e inicializar colores grises
    setTimeout(() => {
      if (this.chart?.chart) {
        // Forzar colores grises iniciales
        const allGrayColors = Array(this.originalColors.length).fill(this.defaultGrayColor);
        this.doughnutChartData.datasets[0].backgroundColor = [...allGrayColors];
        this.chart.chart.update('none'); // Sin animación para la inicialización
      }
    }, 500);
  }

  animateGauge(): void {
    if (!this.gaugeCanvas?.nativeElement) {
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
      return;
    }

    const canvas = this.gaugeCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
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

  onMouseEnter(index: number): void {
    this.highlightChartSegment(index);
  }

  onMouseLeave(): void {
    this.resetChartHighlight();
  }

  toggleDataVisibility(index: number): void {
    if (this.chart?.chart) {
      this.chart.chart.toggleDataVisibility(index);
      this.chart.chart.update();
    }
  }

  isDataVisible(index: number): boolean {
    if (this.chart?.chart) {
      return this.chart.chart.getDataVisibility(index);
    }
    return true;
  }

  highlightChartSegment(index: number): void {
    if (this.chart?.chart && this.doughnutChartData.datasets[0]) {
      const newColors = Array(4).fill(this.defaultGrayColor);
      newColors[index] = this.originalColors[index];
      this.doughnutChartData.datasets[0].backgroundColor = [...newColors];
      this.chart.chart.update();
    }
  }

  resetChartHighlight(): void {
    if (this.chart?.chart && this.doughnutChartData.datasets[0]) {
      const allGrayColors = Array(4).fill(this.defaultGrayColor);
      this.doughnutChartData.datasets[0].backgroundColor = [...allGrayColors];
      this.chart.chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
