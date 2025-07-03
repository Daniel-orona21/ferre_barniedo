import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  private recibos = [
    { id: 11, fecha: '14/02/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-03-AED', estatus: 'Descargado' },
    { id: 10, fecha: '11/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-02-AED', estatus: 'Visto' },
    { id: 9, fecha: '10/01/2025', Usuario: 'Luis López', nombreRecibo: 'RA100VS2025-01-AEF', estatus: 'Pendiente' },
    { id: 8, fecha: '09/01/2025', Usuario: 'María García', nombreRecibo: 'RA100VS2025-01-ABC', estatus: 'Descargado' },
    { id: 7, fecha: '08/01/2025', Usuario: 'Carlos Ruiz', nombreRecibo: 'RA100VS2025-01-DEF', estatus: 'Visto' },
    { id: 6, fecha: '07/01/2025', Usuario: 'Ana Martínez', nombreRecibo: 'RA100VS2025-01-GHI', estatus: 'Pendiente' },
    { id: 5, fecha: '06/01/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-01-JKL', estatus: 'Descargado' },
    { id: 4, fecha: '05/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-01-MNO', estatus: 'Visto' },
  ];

  constructor() { }

  getAllRecibos() {
    return [...this.recibos];
  }

  getReciboById(id: number) {
    return this.recibos.find(recibo => recibo.id === id);
  }

  updateRecibo(updatedRecibo: any) {
    const index = this.recibos.findIndex(r => r.id === updatedRecibo.id);
    if (index !== -1) {
      this.recibos[index] = { ...updatedRecibo };
    }
  }

  addRecibo(newRecibo: any) {
    const newId = this.recibos.length > 0 ? Math.max(...this.recibos.map(r => r.id)) + 1 : 1;
    this.recibos.unshift({ id: newId, ...newRecibo });
  }

  deleteRecibo(id: number) {
    this.recibos = this.recibos.filter(r => r.id !== id);
  }
} 