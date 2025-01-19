import {
  AfterViewInit,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { NgxPaginationModule } from 'ngx-pagination';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RangePipe } from '../../pipes/range.pipe';
import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule,
    // NgxPaginationModule,
    RangePipe,
    MatTableModule,
    MatCheckboxModule,
    CommonModule,
  ],
})
export class SharedTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() data!: any | null;
  @Input() havePagination = true;
  identity: TrackByFunction<any> = (_, item: any) => item.id;
  @Input() extra_id!: any | null;
  total_balance!: any | null;
  selection = new SelectionModel<any>(true, []);
  selectedIds: any = [];
  @Input() displayedColumns!: Array<any>;
  columns!: Array<string>;
  @Input() title!: string;
  @Input() hasClickEvent = false;
  @Input() currentPage!: number;
  @Input() type!: string;
  @Input() pag_id: any = 1;
  customHeaders = [
    'actions',
    'status',
   
    'rating',
    
  ];

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  @Output() sortDataEvent = new EventEmitter<any>();


  constructor(
    private cdref: ChangeDetectorRef,
  ) {
  }
 
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data =changes['data'].currentValue
    console.log(this.dataSource.data)
    this.columns = this.displayedColumns.map((col: any) => col['key']);



  }


  stringify(element: any): string {
    return JSON.stringify(element);
  }
ngOnInit(){
  this.dataSource.filterPredicate = (data:any, filter) => {
    const lowerCaseFilter = filter.trim().toLowerCase();
    return (
      data.name.toLowerCase().includes(lowerCaseFilter) || 
      data.budget.toString().includes(lowerCaseFilter)
    );
  };

}
  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.dataSource.data = this.data
    this.dataSource.sort = this.sort;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  sortData(event: any) {
    this.sortDataEvent.emit(event);
  }



  getColumns() {
    return this.displayedColumns.filter(
      (col) => !this.customHeaders.includes(col.key)
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
