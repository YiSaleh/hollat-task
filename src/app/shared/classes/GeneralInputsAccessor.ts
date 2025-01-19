import { ControlValueAccessor } from '@angular/forms';

export class GeneralInputsAccessor implements ControlValueAccessor {
  input!: any;
  onChange: any = () => {};
  onTouched: any = () => {};
  constructor() {}

  writeValue(input: any): void {
    this.input = input;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public get value(): any {
    return this.input;
  }
  public set value(value: any) {
    this.input = value;
    this.onChange(value);
  }
}
