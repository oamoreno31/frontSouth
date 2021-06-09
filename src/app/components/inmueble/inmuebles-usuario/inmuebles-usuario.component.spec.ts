import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesUsuarioComponent } from './inmuebles-usuario.component';

describe('InmueblesUsuarioComponent', () => {
  let component: InmueblesUsuarioComponent;
  let fixture: ComponentFixture<InmueblesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmueblesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InmueblesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
