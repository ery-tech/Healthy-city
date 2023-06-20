import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
//important for btn reload comments functionality
  isCommentCreated :boolean = false
  constructor() {

   }

 commentCreated(){
  this.isCommentCreated = true;
 }


}
