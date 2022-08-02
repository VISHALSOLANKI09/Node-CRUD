import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBgComponent } from './form-bg.component';

describe('FormBgComponent', () => {
  let component: FormBgComponent;
  let fixture: ComponentFixture<FormBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
