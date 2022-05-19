import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Injector,
  Input,
  Output,
  Type,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appInputControlAccessor]',
})
export class InputControlAccessorDirective implements ControlValueAccessor {
  @Input()
  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): any {
    return this._value;
  }

  @Input() id!: string;
  @Input() label!: string;

  @Input() readonly = false;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() disabled!: boolean;

  @Output() blurred: EventEmitter<void> = new EventEmitter<void>();
  @Output() focused: EventEmitter<void> = new EventEmitter<void>();

  get inputReadonly(): boolean {
    return this.readonly || typeof this.readonly !== 'boolean';
  }

  get inputRequired(): boolean {
    return this.required || typeof this.required !== 'boolean';
  }

  onChange!: (value: any) => {};
  onTouched!: () => {};

  protected _value: any;
  protected cdRef: ChangeDetectorRef;

  constructor(public injector: Injector) {
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: any): void {
    this._value = value;
    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
