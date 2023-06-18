import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

import { ProfileComponent } from './profile.component';
import { AppModule } from 'src/app/app.module';
import { ShareService } from 'src/app/services/share.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service : HttpService
  let shareService: ShareService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule],
      providers: [MatBottomSheet],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpService)
    shareService = TestBed.inject(ShareService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return comments ', () => {
    const id = 1;
    spyOn(service, 'getUserComments').and.returnValue(of([{id: 1, name: 'Comment 1'}, {id: 2, name: 'Comment 2'}]));
    component.fetchComments(id);
    expect(component.comments).toEqual([{id: 1, name: 'Comment 1'}, {id: 2, name: 'Comment 2'}]);
  });

  it('should return "No comments yet" if res is empty', () => {
    const id = 2;
    spyOn(service, 'getUserComments').and.returnValue(of(''));
    component.fetchComments(id);
    expect(component.comments).toEqual([{post_id: id, name: 'No comments yet'}]);
  });

  it('should return posts', () => {

    spyOn(service, 'getUserPosts').and.returnValue(of([{id: 1, body: 'Body 1'}, {id: 2, body: 'Body 2'}]));
    component.fetchPosts();
    expect(component.posts).toEqual([{id: 1,  body: 'Body 1'}, {id: 2, body: 'Body 2'}]);

  });

  it('should return "No posts yet" if res is empty', () => {

    spyOn(service, 'getUserPosts').and.returnValue(of(''));
    component.fetchPosts();
    expect(component.posts).toEqual([{body:'No posts yet'}]);

  });

  it('should return true if a new comment is created', () => {
   let isCommentCreated = true
    shareService.isCommentCreated   = isCommentCreated;
   spyOn(component, 'checkComments').and.callThrough()
   expect(component.checkComments()).toBe(true);
  });
  it('should return false if a new comment is not created', () => {
    let isCommentCreated = false
     shareService.isCommentCreated   = isCommentCreated;
    spyOn(component, 'checkComments').and.callThrough()
    expect(component.checkComments()).toBe(false);
   });
});
