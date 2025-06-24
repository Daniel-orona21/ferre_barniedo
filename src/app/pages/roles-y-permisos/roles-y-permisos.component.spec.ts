import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesYPermisosComponent } from './roles-y-permisos.component';

describe('RolesYPermisosComponent', () => {
  let component: RolesYPermisosComponent;
  let fixture: ComponentFixture<RolesYPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesYPermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesYPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
