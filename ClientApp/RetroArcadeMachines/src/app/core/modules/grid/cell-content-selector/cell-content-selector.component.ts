import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { CellContentTypes } from '../enums/cell-content-types.enum';
import { HeaderItem } from '../models/header-item';

@Component({
  selector: 'app-cell-content-selector',
  templateUrl: './cell-content-selector.component.html',
  styleUrls: ['./cell-content-selector.component.scss']
})
export class CellContentSelectorComponent<T> implements OnInit {

  @Input() columnHeaderData: HeaderItem;
  @Input() value: T;
  @Input() columnHeaderKey: string;

  cellContentTypes = CellContentTypes;

  constructor() { }

  ngOnInit(): void {
  }

  format(value: any, pipeFormatter: PipeTransform, key: string, pipeFormatParam?: string): any {
    if (!pipeFormatter) {
      return value[key];
    }

    if (!pipeFormatParam) {
      return value = pipeFormatter.transform(value[key]);
    }

    return pipeFormatter.transform(value[key], pipeFormatParam);
  }
}
