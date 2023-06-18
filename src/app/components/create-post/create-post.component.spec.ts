import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/services/http.service';

import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let service : HttpService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostComponent ],
      providers: [HttpService],
      imports:[RouterTestingModule, FormsModule, HttpClientTestingModule],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new post', () => {
     spyOn(service, 'createPost').and.callThrough();
    let form:any =  {
      value: {
        id: '',
        title: 'randomTitle',
        body: 'randomBody',
      }
    }

    component.createPost(form)
    fixture.detectChanges();
    expect(service.createPost).toHaveBeenCalledWith(undefined,  {user_id: '', title: 'randomTitle', body: 'randomBody'});

  });
});
