import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenenEnProcesoComponent } from './almacenen-en-proceso.component';

describe('AlmacenenEnProcesoComponent', () => {
  let component: AlmacenenEnProcesoComponent;
  let fixture: ComponentFixture<AlmacenenEnProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenenEnProcesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenenEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
