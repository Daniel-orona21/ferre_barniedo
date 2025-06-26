import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudeoComponent } from './menudeo.component';

describe('MenudeoComponent', () => {
  let component: MenudeoComponent;
  let fixture: ComponentFixture<MenudeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenudeoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenudeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
