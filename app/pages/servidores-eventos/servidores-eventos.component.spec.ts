import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidoresEventosComponent } from './servidores-eventos.component';

describe('ServidoresEventosComponent', () => {
  let component: ServidoresEventosComponent;
  let fixture: ComponentFixture<ServidoresEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServidoresEventosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServidoresEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
