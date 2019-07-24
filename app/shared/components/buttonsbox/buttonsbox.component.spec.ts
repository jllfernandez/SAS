import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsboxComponent } from './buttonsbox.component';

describe('ButtonsboxComponent', () => {
  let component: ButtonsboxComponent;
  let fixture: ComponentFixture<ButtonsboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
