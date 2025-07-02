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

  // Datos base que se actualizarán según el período
  public descargasData = [150, 300, 150, 100];
  public descargasTotal = this.descargasData.reduce((acc, curr) => acc + curr, 0)

  public recibosData = [250, 350, 150, 250];
  public recibosTotal = this.recibosData.reduce((acc, curr) => acc + curr, 0);

  public cumplimientoTotal = (this.descargasTotal / this.recibosTotal) * 100;

  // Conjuntos de datos por período
  private dataByPeriod = {
    '1d': {
      recibosData: [45, 52, 28, 35],
      descargasData: [38, 44, 22, 28],
      lineChartData: [
        [8, 12, 15, 20, 35, 45, 52, 48, 42, 38, 25, 18], // Recibos por hora
        [6, 10, 12, 16, 28, 38, 44, 40, 35, 32, 20, 15]  // Descargas por hora
      ],
      lineLabels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
    },
    '7d': {
      recibosData: [180, 220, 120, 150],
      descargasData: [150, 180, 95, 120],
      lineChartData: [
        [120, 135, 110, 145, 160, 140, 155], // Recibos
        [98, 112, 88, 118, 132, 115, 128]    // Descargas
      ],
      lineLabels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    },
    '30d': {
      recibosData: [450, 520, 380, 420],
      descargasData: [380, 440, 320, 350],
      lineChartData: [
        [120, 135, 110, 145, 160, 140, 155, 170, 150, 165, 180, 160, 175, 190, 170, 185, 200, 180, 195, 210, 190, 205, 220, 200, 215, 230, 210, 225, 240, 220], // Recibos
        [98, 112, 88, 118, 132, 115, 128, 142, 125, 138, 152, 135, 148, 162, 145, 158, 172, 155, 168, 182, 165, 178, 192, 175, 188, 202, 185, 198, 212, 195]    // Descargas
      ],
      lineLabels: Array.from({length: 30}, (_, i) => `${i + 1}`)
    },
    'Este mes': {
      recibosData: [250, 350, 150, 250],
      descargasData: [150, 300, 150, 100],
      lineChartData: [
        [6241, 1543, 3848, 938, 2500, 2550, 3200, 2100, 4500, 3800, 2900, 1500], // Recibos
        [5000, 1200, 2500, 800, 1900, 1500, 2800, 1800, 3500, 2900, 2100, 1200]  // Descargas
      ],
      lineLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
  };

  public gaugeValue = this.cumplimientoTotal; 
  public gaugeMax = 100;
  public gaugeMin = 0;
  private currentAnimatedValue = 0; 
  private animationId?: number;

  private originalColors = ['#87A9BE', '#87A9BE', '#87A9BE', '#87A9BE'];
  private defaultGrayColor = 'rgba(255, 255, 255, 0.065)';


  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Ecotecnias', 'Mendoza', 'San Luis Potosí', 'Puebla'],
    datasets: [{
      data: this.recibosData,
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
      duration: 500,
      easing: 'easeOutQuart'
    }
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        data: [6241, 1543, 3848, 938, 2500, 2550, 3200, 2100, 4500, 3800, 2900, 1500],
        label: 'Recibos emitidos',
        fill: true,
        borderColor: '#87A9BE',
        backgroundColor: 'rgba(135, 169, 190, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#87A9BE',
        pointBorderColor: '#87A9BE'
      },
      {
        data: [5000, 1200, 2500, 800, 1900, 1500, 2800, 1800, 3500, 2900, 2100, 1200],
        label: 'Descargas',
        fill: true,
        tension: 0,
        borderColor: 'rgba(255, 255, 255, 0.065)',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.065)',
        pointBorderColor: 'rgba(255, 255, 255, 0.065)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * 60;
        }
        return delay;
      }
    },
    animations: {
      tension: undefined,
      borderWidth: {
        duration: 500,
        easing: 'easeOutQuart',
        from: 0,
        to: 2
      }
    },
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
      },
      point: {
        radius: 4,
        hoverRadius: 6,
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
    // Inicializar con el período activo por defecto
    const activePeriod = this.timePeriods.find(p => p.active);
    if (activePeriod) {
      this.updateDataForPeriod(activePeriod.label);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateGauge();
    }, 0);
    
    setTimeout(() => {  
      if (this.chart?.chart) {
        const allGrayColors = Array(this.originalColors.length).fill(this.defaultGrayColor);
        this.doughnutChartData.datasets[0].backgroundColor = [...allGrayColors];
        this.chart.chart.update('none'); 
      }
    }, 0);
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
    gradient.addColorStop(0, '#87a9be24');
    gradient.addColorStop(0.5, '#87a9be77');
    gradient.addColorStop(1, '#87A9BE');

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
    this.updateDataForPeriod(period.label);
  }

  private updateDataForPeriod(periodLabel: string): void {
    const periodData = this.dataByPeriod[periodLabel as keyof typeof this.dataByPeriod];
    if (!periodData) return;

    // Actualizar datos base
    this.recibosData = [...periodData.recibosData];
    this.descargasData = [...periodData.descargasData];
    this.recibosTotal = this.recibosData.reduce((acc, curr) => acc + curr, 0);
    this.descargasTotal = this.descargasData.reduce((acc, curr) => acc + curr, 0);
    this.cumplimientoTotal = (this.descargasTotal / this.recibosTotal) * 100;

    // Actualizar gauge
    this.gaugeValue = this.cumplimientoTotal;
    this.currentAnimatedValue = 0;
    this.animateGauge();

    // Actualizar gráfico de dona
    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{
        ...this.doughnutChartData.datasets[0],
        data: [...this.recibosData]
      }]
    };

    // Actualizar gráfico de línea
    this.lineChartData = {
      labels: [...periodData.lineLabels],
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: [...periodData.lineChartData[0]]
        },
        {
          ...this.lineChartData.datasets[1],
          data: [...periodData.lineChartData[1]]
        }
      ]
    };

    // Actualizar tabla de resumen
    this.summaryData = [
      { 
        sucursal: 'Ecotecnias', 
        recibos: this.recibosData[0], 
        descargas: this.descargasData[0], 
        cumplimiento: ((this.descargasData[0] / this.recibosData[0]) * 100).toFixed(1), 
        color: this.originalColors[0] 
      },
      { 
        sucursal: 'Mendoza', 
        recibos: this.recibosData[1], 
        descargas: this.descargasData[1], 
        cumplimiento: ((this.descargasData[1] / this.recibosData[1]) * 100).toFixed(1), 
        color: this.originalColors[1] 
      },
      { 
        sucursal: 'San Luis Potosí', 
        recibos: this.recibosData[2], 
        descargas: this.descargasData[2], 
        cumplimiento: ((this.descargasData[2] / this.recibosData[2]) * 100).toFixed(1), 
        color: this.originalColors[2] 
      },
      { 
        sucursal: 'Puebla', 
        recibos: this.recibosData[3], 
        descargas: this.descargasData[3], 
        cumplimiento: ((this.descargasData[3] / this.recibosData[3]) * 100).toFixed(1), 
        color: this.originalColors[3] 
      }
    ];

    // Actualizar gráficos con animación suave
    if (this.chart?.chart) {
      // Resetear colores del gráfico de dona
      const allGrayColors = Array(this.originalColors.length).fill(this.defaultGrayColor);
      this.doughnutChartData.datasets[0].backgroundColor = [...allGrayColors];
      
      // Animación más suave para el cambio de datos
      this.chart.chart.update('show');
    }
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
