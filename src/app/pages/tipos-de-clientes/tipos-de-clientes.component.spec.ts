import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeClientesComponent } from './tipos-de-clientes.component';

describe('TiposDeClientesComponent', () => {
  let component: TiposDeClientesComponent;
  let fixture: ComponentFixture<TiposDeClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDeClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDeClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
