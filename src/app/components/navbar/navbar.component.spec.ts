import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let auth : AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logout the user onclick', () => {

    spyOn(auth, 'isAuthenticated').and.returnValue(true);
    const authOnLogout = spyOn(auth, 'onLogout')
    const addButton = fixture.debugElement.query(By.css('.nav-link')).nativeElement;
    addButton.click();
    component.logoutClick()
   expect(authOnLogout).toHaveBeenCalled()

  });
  it('should return true if user isAuthenticated', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(true);
    expect(component.isLoggedState()).toBe(true);

  });
  it('should return false if user is not Authenticated', () => {

    spyOn(auth, 'isAuthenticated').and.returnValue(false)
    expect(component.isLoggedState()).toBe(false)

  });


});
