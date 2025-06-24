import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefaccioensComponent } from './refaccioens.component';

describe('RefaccioensComponent', () => {
  let component: RefaccioensComponent;
  let fixture: ComponentFixture<RefaccioensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefaccioensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefaccioensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
