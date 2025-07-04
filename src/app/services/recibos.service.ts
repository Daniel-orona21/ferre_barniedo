import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  private recibosAdmin = [
    { id: 11, fecha: '14/02/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-03-AED', estatus: 'Descargado' },
    { id: 10, fecha: '11/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-02-AED', estatus: 'Visto' },
    { id: 9, fecha: '10/01/2025', Usuario: 'Luis López', nombreRecibo: 'RA100VS2025-01-AEF', estatus: 'Pendiente' },
    { id: 8, fecha: '09/01/2025', Usuario: 'María García', nombreRecibo: 'RA100VS2025-01-ABC', estatus: 'Descargado' },
    { id: 7, fecha: '08/01/2025', Usuario: 'Carlos Ruiz', nombreRecibo: 'RA100VS2025-01-DEF', estatus: 'Visto' },
    { id: 6, fecha: '07/01/2025', Usuario: 'Ana Martínez', nombreRecibo: 'RA100VS2025-01-GHI', estatus: 'Pendiente' },
    { id: 5, fecha: '06/01/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-01-JKL', estatus: 'Descargado' },
    { id: 4, fecha: '05/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-01-MNO', estatus: 'Visto' },
  ];

  private recibosEmpleado = [
    { id: 11, fecha: '15/02/2025', Usuario: 'Usuario Empleado', nombreRecibo: 'RA100VS2025-03-AED', estatus: 'Descargado' },
    { id: 10, fecha: '31/01/2025', Usuario: 'Usuario Empleado', nombreRecibo: 'RA100VS2025-02-ABD', estatus: 'Visto' },
    { id: 9, fecha: '15/01/2025', Usuario: 'Usuario Empleado', nombreRecibo: 'RA100VS2025-01-AEF', estatus: 'Pendiente' },
    { id: 7, fecha: '31/12/2024', Usuario: 'Usuario Empleado', nombreRecibo: 'RA100VS2024-052-OED', estatus: 'Pendiente' },
  ];

  constructor() { }

  getAllRecibos(userRole?: string) {
    if (userRole === 'empleado') {
      return [...this.recibosEmpleado];
    }
    return [...this.recibosAdmin];
  }

  getReciboById(id: number, userRole?: string) {
    const recibos = userRole === 'empleado' ? this.recibosEmpleado : this.recibosAdmin;
    return recibos.find(recibo => recibo.id === id);
  }

  updateRecibo(updatedRecibo: any) {
    const index = this.recibosAdmin.findIndex(r => r.id === updatedRecibo.id);
    if (index !== -1) {
      this.recibosAdmin[index] = { ...updatedRecibo };
    }
  }

  addRecibo(newRecibo: any) {
    const newId = this.recibosAdmin.length > 0 ? Math.max(...this.recibosAdmin.map(r => r.id)) + 1 : 1;
    this.recibosAdmin.unshift({ id: newId, ...newRecibo });
  }

  deleteRecibo(id: number) {
    this.recibosAdmin = this.recibosAdmin.filter(r => r.id !== id);
  }
} 