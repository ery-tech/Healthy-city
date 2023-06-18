import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    controller= TestBed.inject(HttpTestingController);
  });

  afterEach( ()=> {controller.verify()});
//testing getUserList function
  it('should get usersList', () => {
   const fakeUsers = [{ id: 1, name: 'Fake Name' }, { id: 2, name: 'Other Name' }];
   const page = 1;
   const perPage = 20 ;

   service.getUsersList(page, perPage).subscribe((users) =>   expect(users).toEqual(fakeUsers));

  const req = controller.expectOne(`${environment.BASE_URL}/users?page=${page}&per_page=${perPage}`);

  req.flush(fakeUsers)
  expect(req.request.method).toBe('GET');
  });

  it('should return User comments', () => {
    const fakeComments = [
      {postId: 3, title: 'Fake Title', body: 'Fake Body'},
      {postId: 4, title: 'Fake Title', body: 'Fake Body'},
    ];

    const postId = 3;

    service.getUserComments(3).subscribe(comments => {
      expect(comments).toEqual(fakeComments);
    });

    const req = controller.expectOne(`${environment.BASE_URL}/posts/${postId}/comments`);

    req.flush(fakeComments);
    expect(req.request.method).toBe('GET');
  });

  it('should create a user', () => {
    const user = {
    name: 'Jiji',
    email: 'jiji@jiji.com',
    gender: 'female',
    status: 'active'
    };

    service.createUser(user).subscribe(response => expect(response.status).toBe(200));

    const request = controller.expectOne(`${environment.BASE_URL}/users`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(user);
    request.flush({ status: 200 });
    });


    it('should delete a user', () => {
      const UserId = 1;

      service.deleteUser(UserId).subscribe(res => {
        expect(res.status).toBe(200);
      });

      const req = controller.expectOne(`${environment.BASE_URL}/users/${UserId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ status: 200 });
      });




});
