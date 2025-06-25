import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecolucionesComponent } from './decoluciones.component';

describe('DecolucionesComponent', () => {
  let component: DecolucionesComponent;
  let fixture: ComponentFixture<DecolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecolucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
