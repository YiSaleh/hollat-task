import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  imports:[CommonModule],
  standalone:true
})
export class RatingStarsComponent {
  @Input() maxStars = 5; // Total number of stars
  @Output() ratingChange = new EventEmitter<number>(); // Emit rating change
  currentRating = 0; // Current selected rating
  hoverIndex = 0; // Current hover index
  @Input() rating:any= 3; // Initial rating value
  @Input() comment: any
  @Input() benefId!:string;
  sameUser:boolean  = false
userId:number = 0
  get stars(): number[] {
    return Array(this.maxStars).fill(0);
  }
  constructor(){
    this.userId = +(localStorage.getItem('id')??0);
  }
  ngOnInit(){
    this.currentRating= this.rating
if(this.userId  === +this.benefId){
  this.sameUser = true
}
     
  }

  setRating(rating: number): void {
    if(!this.sameUser){

    this.rating = rating;

    this.currentRating = rating;
    this.ratingChange.emit(this.currentRating);
  }}

  setHover(rating: number): void {
    if(!this.sameUser){

    this.hoverIndex = rating;

    }
  }

  clearHover(): void {
    if(!this.sameUser){

    this.hoverIndex = 0;
    }
  }
}
