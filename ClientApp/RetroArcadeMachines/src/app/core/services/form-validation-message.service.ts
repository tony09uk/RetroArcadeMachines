import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormValidationMessageService {
    required(fieldName: string): string {
        return `${fieldName} is required`;
    }

    minLength(fieldName: string, charaterCount: number): string {
        return `${fieldName} must have at least ${charaterCount} charaters`;
    }

    maxLength(fieldName: string, charaterCount: number): string {
        return `a maximum of ${charaterCount} charaters is allowed for ${fieldName}`;
    }

    pattern(fieldName: string): string {
        return `you have a used an invalid charater in ${fieldName}`;
    }
}
