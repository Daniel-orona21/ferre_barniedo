import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesDeCompraComponent } from './reporte.component';

describe('OrdenesDeCompraComponent', () => {
  let component: OrdenesDeCompraComponent;
  let fixture: ComponentFixture<OrdenesDeCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesDeCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
