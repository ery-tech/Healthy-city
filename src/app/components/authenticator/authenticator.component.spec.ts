import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticatorComponent } from './authenticator.component';
import {  MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('AuthenticatorComponent', () => {
  let component: AuthenticatorComponent;
  let fixture: ComponentFixture<AuthenticatorComponent>;
  const matBottomSheet = {dismiss : jasmine.createSpy('dismiss')}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatorComponent ],
      imports : [FormsModule],
      providers: [{provide:MatBottomSheetRef, useValue: matBottomSheet }],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });


  it("should set token in localStorage, dismiss mat sheet and navigate to profiles page", () => {

    const form: any= { value: { accessToken: "token" } };
    const localStorageSpy = spyOn(localStorage, "setItem");
    const routerSpy = spyOn(TestBed.inject(Router), "navigate");
    component.login(form);

   expect(matBottomSheet.dismiss).toHaveBeenCalled()
    expect(localStorageSpy).toHaveBeenCalledWith("accessToken", "token");
    expect(routerSpy).toHaveBeenCalledWith(["/profiles"]);
  });
});
