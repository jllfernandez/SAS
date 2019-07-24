import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadoresComponent } from './portadores.component';

describe('PortadoresComponent', () => {
  let component: PortadoresComponent;
  let fixture: ComponentFixture<PortadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortadoresComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
