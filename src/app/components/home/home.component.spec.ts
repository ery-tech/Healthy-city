import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const matBottomSheet = {open : jasmine.createSpy('open')}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [],
      providers: [{provide: MatBottomSheet, useValue:matBottomSheet}],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open a mat sheet on button click to create a new user', () => {
    const button = fixture.debugElement.query(By.css('[type="button"]')).nativeElement;
    button.click();
    component.onGetStartedClick()
   expect(matBottomSheet.open).toHaveBeenCalledWith(AuthenticatorComponent)
  });
});
