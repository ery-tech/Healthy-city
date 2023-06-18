import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { PaginationComponent } from '../pagination/pagination.component';

import { ProfilesComponent } from './profiles.component';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let service: HttpService;
  const matBottomSheet = {open : jasmine.createSpy('open')}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesComponent , PaginationComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpService,{provide :MatBottomSheet , useValue : matBottomSheet}],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
    service = TestBed.inject(HttpService);
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter profiles by name', () => {
    const fakeUsers = [
      {postId: 1, name: 'fakeUser1'},
      {postId: 2, name: 'fakeUser2' },
      {postId: 3, name: 'fakeUser3' }
    ];

    const searchValue = 'fakeUser2';
   spyOn(service, 'getUsersList').and.returnValue(of(fakeUsers))
    component.searchUser(searchValue);
    expect(component.usersList.length).toEqual(1);
    expect(component.usersList[0].name).toEqual('fakeUser2')
  });

  it('should open a mat sheet on button click to create a new user', () => {
    const addButton = fixture.debugElement.query(By.css('.add-btn')).nativeElement;
    addButton.click();
    component.onAddClick()
   expect(matBottomSheet.open).toHaveBeenCalledWith(CreateUserComponent)
  });
});
