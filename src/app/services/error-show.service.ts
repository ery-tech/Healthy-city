import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
@Injectable({
  providedIn: 'root',

})
export class ErrorShowService {

  constructor(private snackBar: SnackBarComponent) { }



  checkErrorType(error : any){
    if(error== 401){
      this.snackBar.openSnackBar(
        `${error}: Unauthorized, please make sure access token is correct. `, 'close','redSnackbar')
    }
   else if(error== 404){
    this.snackBar.openSnackBar(
      `${error}: Not found, the resource doesn't exist. `, 'close','redSnackbar')
   }
   else if(error== 500){
    this.snackBar.openSnackBar(
      `${error}: Internal Server Error, please try again later. `, 'close','redSnackbar')
   }
   else {
    this.snackBar.openSnackBar(
      ' Something went wrong, try again. ', 'close','redSnackbar')

   }
  }
}
