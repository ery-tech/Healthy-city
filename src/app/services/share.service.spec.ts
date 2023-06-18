import { TestBed } from '@angular/core/testing';

import { ShareService } from './share.service';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a true if function is called', () => {
   service.isCommentCreated = false
   service.commentCreated()
   expect(service.isCommentCreated).toBe(true);
  });

  it('should return a false if function is called', () => {
    let  isCommentCreated :boolean = true
    function spyCommentCreated (){
     isCommentCreated = false
    }
    spyOn(service, 'commentCreated').and.callFake(spyCommentCreated)
    service.commentCreated()
    expect(isCommentCreated).toBeFalse();
   });

});
