import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaquelComponent } from './anaquel.component';

describe('AnaquelComponent', () => {
  let component: AnaquelComponent;
  let fixture: ComponentFixture<AnaquelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaquelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaquelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
