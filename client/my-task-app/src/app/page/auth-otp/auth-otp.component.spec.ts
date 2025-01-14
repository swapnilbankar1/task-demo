import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOTPComponent } from './auth-otp.component';

describe('AuthOTPComponent', () => {
  let component: AuthOTPComponent;
  let fixture: ComponentFixture<AuthOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthOTPComponent]
    });
    fixture = TestBed.createComponent(AuthOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
