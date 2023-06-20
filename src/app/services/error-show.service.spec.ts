import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

import { ErrorShowService } from './error-show.service';

describe('ErrorShowService', () => {
  let service: ErrorShowService;
  let snackBar : MatSnackBar
  const Matsnackbar = {open : jasmine.createSpy('open')}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [MatSnackBarConfig,SnackBarComponent, MatSnackBar,
        {provide:MatSnackBar, useValue:Matsnackbar  }],
      imports:[]
    });
    service = TestBed.inject(ErrorShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called with 401 error', () => {
     let error = 401
    let mockError =  '401: Unauthorized, please make sure access token is correct.'
    service.checkErrorType(error)
    expect(Matsnackbar.open.calls.mostRecent().args[0]).toContain(mockError )

  });
  it('should be called with 404 error', () => {
    let error = 404
   let mockError =  "404: Not found, the resource doesn't exist."
   service.checkErrorType(error)
   expect(Matsnackbar.open.calls.mostRecent().args[0]).toContain(mockError )

 });
 it('should be called with 500 error', () => {
  let error = 500
 let mockError =  '500: Internal Server Error, please try again later. '
 service.checkErrorType(error)
 expect(Matsnackbar.open.calls.mostRecent().args[0]).toContain(mockError )

});
it('should be called with  error', () => {
  let error = 400
 let mockError =  ' Something went wrong, try again. '
 service.checkErrorType(error)
 expect(Matsnackbar.open.calls.mostRecent().args[0]).toContain(mockError )

});
});
