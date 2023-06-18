import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{

@Input()currentPage :number = 1;
total: number= 100 ;
limit: number= 20;
@Output()changePage = new EventEmitter<number>()

pages: number[]= []
ngOnInit(): void {
  //calc number of pages
 const pagesCount= Math.ceil(this.total/this.limit)

 this.pages = this.range(1,pagesCount)
}
//even though the pages count  changed this function provides the right number of total pages
range(start:number, end:number):number[]{
  return[...Array(end).keys()].map((el)=>el+start)
}
}
