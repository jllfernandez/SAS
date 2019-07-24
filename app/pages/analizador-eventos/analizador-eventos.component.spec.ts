import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizadorEventosComponent } from './analizador-eventos.component';

describe('AnalizadorEventosComponent', () => {
  let component: AnalizadorEventosComponent;
  let fixture: ComponentFixture<AnalizadorEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalizadorEventosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizadorEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
