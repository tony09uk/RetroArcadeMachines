import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterViewInit  {

  @Input() isContainedByParent: boolean = false;
  @Input() show: boolean = false;
  get parentHeight(): number {
    return this._parentHeight;
  }

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private _host: ElementRef) { }
  private _parentHeight: number;

  ngAfterViewInit(): void {
    // todo: move this to directive
    this._parentHeight = this._host.nativeElement.parentNode.offsetHeight;
  }
}
