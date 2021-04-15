import { AbstractControl } from '@angular/forms';

type functionValidator = (control: AbstractControl) => any | null;

export abstract class ABValidators {
  static realisticDate(control: AbstractControl): any | null {
    const value = new Date(control.value);
    const today = new Date();
    const min = new Date(today.setFullYear(today.getFullYear() - 1));
    const max = new Date(today.setFullYear(today.getFullYear() + 1));
    if (value < min || value > max) {
      return {
        'realistic-date': 'One year before or after today',
      };
    }
    return null;
  }

  static includes(expected: string): functionValidator {
    return function (control: AbstractControl): any | null {
      const value = control.value as string;
      if (
        value &&
        value.toLocaleLowerCase().includes(expected.trim().toLocaleLowerCase())
      ) {
        return null;
      } else {
        return { includes: expected + ' not found' };
      }
    };
  }
}
