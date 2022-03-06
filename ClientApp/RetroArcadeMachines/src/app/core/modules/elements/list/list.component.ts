import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from './models/list-item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() header: string;
  @Input() showDividerAfterList: boolean = false;
  @Input() items: ListItem[] = [];

  @Output() itemRemoved: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  remove(item: ListItem): void {
    const itemIndex = this.items.indexOf(item);
    this.items.splice(itemIndex, 1);
    this.itemRemoved.emit(item);
  }
}
