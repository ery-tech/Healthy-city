import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let service : HttpService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      providers: [HttpService],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(HttpService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp function on submit ', () => {


    spyOn(component, 'signUp');
    const submitButton = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;;
    submitButton.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalled();

  });
  it('should create a new user ', () => {
    let form :any = {
      value:{
        name: 'Jiji',
        email: 'jiji@jiji.com',
        gender: 'female',
        status: 'active'
      }
    }
    component.signUp(form);
    expect(component.user.name).toEqual('Jiji');
    expect(component.user.email).toEqual('jiji@jiji.com');
    expect(component.user.gender).toEqual('female');
    expect(component.user.status).toEqual('active');

  });

});


