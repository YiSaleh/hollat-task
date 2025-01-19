import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { GeneralInputsAccessor } from '../../classes/GeneralInputsAccessor';


@Component({
  selector: 'app-multiselect-with-chips',
  standalone: true,
  templateUrl: './multiselect-with-chips.component.html',
  styleUrls: ['./multiselect-with-chips.component.scss'],
  imports: [
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectWithChipsComponent),
      multi: true,
    },
  ],
})
export class MultiselectWithChipsComponent extends GeneralInputsAccessor {
  @Input() chipsList!: any[];
  @Input() chipToAdd!: any[];
  @Input() isDisabled: boolean = false;

  @Input() isSubmitted = false;
  @Input() errors!: ValidationErrors | null;
  @Input() placeholder!: string;
  @Input() selectedChip: any | undefined;
  @Output() chipSelected = new EventEmitter<string>();

  onItemRemoved(item: string) {
    const items = this.input as string[];
    const mappedItems = this.removeFirst(items, item);

    this.value = [...mappedItems];
  }

  private removeFirst<T>(array: T[], toRemove: T): Array<any> {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }
  selectChip(chip: any): void {
    this.onChange(chip);
    this.selectedChip = chip;
    this.chipSelected.emit(chip);
  }
}
