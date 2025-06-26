import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEspecialComponent } from './pedido-especial.component';

describe('PedidoEspecialComponent', () => {
  let component: PedidoEspecialComponent;
  let fixture: ComponentFixture<PedidoEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
