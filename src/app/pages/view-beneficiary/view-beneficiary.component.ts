import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalTableHeaderComponent } from "../../shared/components/global-table-header/global-table-header.component";
import { RatingStarsComponent } from "../../shared/components/rating-stars/rating-stars.component";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../../shared/components/success-snackbar/success-snackbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-beneficiary',
  standalone: true,
  imports: [GlobalTableHeaderComponent, RatingStarsComponent,MatSnackBarModule,CommonModule],
  templateUrl: './view-beneficiary.component.html',
  styleUrl: './view-beneficiary.component.scss'
})

export class ViewBeneficiaryComponent {
  element:any
  durationInSeconds = 5;
role : string | null
  constructor(private route: ActivatedRoute,private _snackBar: MatSnackBar) {
    this.role = localStorage.getItem("role")

  }


  ngOnInit(){
    this.element = JSON.parse(this.route.snapshot.queryParams['element']);
    console.log('Element (snapshot):', this.element);

  }
  onRatingChange(){
      this._snackBar.openFromComponent(SuccessSnackbarComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: ['custom-snackbar'],
      });
    
  }
}
