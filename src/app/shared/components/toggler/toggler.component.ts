import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TogglerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglerComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() disabled = false;

  @Input() set value(isChecked: boolean) {
    this.isChecked = isChecked;
    this._value = isChecked;
    this.onChange(isChecked);
  }

  get value(): any {
    return this._value;
  }

  isCheckedOnPush$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isChecked!: boolean;

  protected _value: any;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  writeValue(value: any): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleChecked(): void {
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.onChange(this.isChecked);
    }
  }
}
