import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPortadoresComponent } from './busqueda-portadores.component';

describe('BusquedaPortadoresComponent', () => {
  let component: BusquedaPortadoresComponent;
  let fixture: ComponentFixture<BusquedaPortadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaPortadoresComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPortadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
