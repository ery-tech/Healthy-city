import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  isCommentCreated :boolean = false
  constructor() {

   }

 commentCreated(){
  this.isCommentCreated = true;
 }


}
