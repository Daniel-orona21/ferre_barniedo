import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenenComponent } from './almacenen.component';

describe('AlmacenenComponent', () => {
  let component: AlmacenenComponent;
  let fixture: ComponentFixture<AlmacenenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
