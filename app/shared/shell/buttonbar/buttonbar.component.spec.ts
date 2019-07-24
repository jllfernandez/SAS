import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonbarComponent } from './buttonbar.component';

describe('ButtonbarComponent', () => {
  let component: ButtonbarComponent;
  let fixture: ComponentFixture<ButtonbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
