import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import {Location} from "@angular/common";
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],

    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    service = TestBed.inject(AuthService);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is logged out ', () => {
    expect(service.onLogout()).toBe(localStorage.clear());
  })

  it('is logged out and should navigate to home page',fakeAsync( () => {
   router.navigate([''])
   tick();
   expect(location.path()).toEqual('/');
  }))



  it('is authenticated', () => {
    let fakeToken = 'abc12345bbdefgh';
    localStorage.setItem('accessToken', fakeToken)
    expect(service.isAuthenticated()).toBeTrue()
  })

  it('is not authenticated', () => {
    localStorage.clear()
    expect(service.isAuthenticated()).toBeFalse()
  })

});
