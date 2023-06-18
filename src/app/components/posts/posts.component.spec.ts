import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { CreatePostComponent } from '../create-post/create-post.component';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
 let service : HttpService
 const matBottomSheet = {open : jasmine.createSpy('open')}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provide:MatBottomSheet, useValue: matBottomSheet }],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpService)
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

  it('should return "No comments yet" if data is empty', () => {
    const id = 2;
    spyOn(service, 'getUserComments').and.returnValue(of(''));
    component.fetchComments(id);
    expect(component.comments).toEqual([{post_id: id, name: 'No comments yet'}]);
  });

  it('should open a mat sheet on button click to create a new posts', () => {
    const addButton = fixture.debugElement.query(By.css('.add-btn')).nativeElement;
    addButton.click();
    component.onAddClick()
   expect(matBottomSheet.open).toHaveBeenCalledWith(CreatePostComponent)
  });

  it('should filter posts by title', () => {
    let fakePosts = [
      { id: 1, title: 'Fake title 1', body: 'Fake body 1' },
      { id: 2, title: 'Fake title 2', body: 'Fake body 2' },
      { id: 3, title: 'Fake title 3', body: 'Fake body 3' },
    ];
    spyOn(service, 'getPosts').and.returnValue(of(fakePosts));
    const searchValue = 'Fake title 2';
    component.searchPost(searchValue);
    expect(component.posts.length).toEqual(1);
    expect(component.posts[0].title).toEqual('Fake title 2');
  })
});
