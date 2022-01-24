import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() text: string;
  @Input() icon: string;
  @Input() isDisabled: boolean = false;
  @Input() color: ThemePalette = 'primary';

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  buttonClicked(): void {
    this.clicked.emit();
  }
}
