import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export function CustomEmailValidator(c: AbstractControl): ValidationErrors | null {
  // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  // eslint-disable-next-line max-len
  const EMAIL_PATTERN: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isInvalid: ValidationErrors | null = Validators.pattern(EMAIL_PATTERN)(c);

  return isInvalid ? {email: true} : null;
}
