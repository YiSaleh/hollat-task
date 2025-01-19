import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-table-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-table-header.component.html',
  styleUrls: ['./global-table-header.component.scss']
})
export class GlobalTableHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: false }) url!: string;
}
