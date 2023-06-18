import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let service : HttpService
  let shareService : ShareService
  const matBottomSheet = {dismiss : jasmine.createSpy('dismiss')}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsComponent ],
      providers:[HttpService,  ShareService , {provide: MatBottomSheet, useValue: matBottomSheet}],
      imports:[HttpClientTestingModule, FormsModule],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(HttpService);
    shareService = TestBed.inject(ShareService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should create a new comment ', () => {
    let form :any = {
      value:{
        name: 'Jiji',
        email: 'jiji@jiji.com',
        body: 'AngularTestingTitle',

      }
    }

    component.createComment(form);
    expect(component.comment.name).toEqual('Jiji');
    expect(component.comment.email).toEqual('jiji@jiji.com');
    expect(component.comment.body).toEqual('AngularTestingTitle');
  });

  it('should be updated the shareService when updateComments is called', () =>{
    const commentCreatedFn = spyOn(shareService, 'commentCreated')
    component.updateComments();

    expect(matBottomSheet.dismiss).toHaveBeenCalled();
    expect(commentCreatedFn).toHaveBeenCalled();

  })
});
