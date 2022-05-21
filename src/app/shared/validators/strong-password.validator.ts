import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export function StrongPasswordValidator(c: AbstractControl): ValidationErrors | null {
  const missedMinimumLength: ValidationErrors | null = Validators.pattern(/^.{8,}$/)(c);
  const missedNumbers: ValidationErrors | null = Validators.pattern(/^.*[0-9].*$/)(c);
  const missedCharacters: ValidationErrors | null = Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/)(c);

  if (missedMinimumLength) {
    return {password: 'weak'};
  } else if (missedNumbers) {
    return {password: 'mediate'};
  } else if (missedCharacters) {
    return {password: 'strong'};
  }

  return null;
}
