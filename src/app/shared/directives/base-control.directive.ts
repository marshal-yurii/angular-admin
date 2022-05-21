import {Input, Directive} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';

@Directive()
export class BaseControlDirective {
  @Input() formControlName!: string;
  @Input() placeholder = '';
  @Input() autofocus!: boolean;
  @Input() autoselect!: boolean;
  @Input() maxLength!: number;
  @Input() disable!: boolean;
  @Input() tabInd!: number;

  errors!: ValidationErrors | null;
  control: FormControl = new FormControl();
  innerValue: any = null;
  default!: any;
  isFocused!: boolean;

  onChangeCallback!: (v: any) => void;
  onTouchCallback!: (v: any) => void;

  writeValue(v: any): void {
    this.innerValue = v;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: (v: any) => void): void {
    this.onTouchCallback = fn;
  }

  setDisabledState(disable: boolean): void {
    this.disable = disable;
  }

  validate(c: FormControl): any {
    this.control = c;
    this.control.statusChanges.subscribe(_ => this.updateState());
  }

  updateValue(): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(this.innerValue);
    }
    this.updateState();
  }

  updateState(): void {
    if (!this.control) {
      return;
    }
    this.errors = this.control.errors;
  }

  set value(v: any) {
    this.innerValue = v;
    this.updateValue();
  }

  get value(): any {
    return this.innerValue;
  }

  onBlur(): void {
    this.isFocused = false;
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  onFocus(): void {
    this.isFocused = true;
  }
}
