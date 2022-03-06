import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatListHarness } from '@angular/material/list/testing';

import { ListComponent } from './list.component';
import { ListItem } from './models/list-item.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let loader: HarnessLoader;

  let listItems: ListItem[];

  beforeEach(async () => {
    listItems = [
      { allowDelete: false, id: '1', value: 'Test 1' } as ListItem,
      { allowDelete: false, id: '2', value: 'Test 2' } as ListItem,
      { allowDelete: false, id: '3', value: 'Test 3' } as ListItem,
      { allowDelete: false, id: '4', value: 'Test 4' } as ListItem,
    ];
    await TestBed.configureTestingModule({
      imports: [
        MatListModule
      ],
      declarations: [
        ListComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.items = listItems;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all items', async () => {
    const list = await loader.getHarness(MatListHarness);
    const items = await list.getItems();
    expect(await parallel(() => items.map(i => i.getText()))).toEqual([
      listItems[0].value,
      listItems[1].value,
      listItems[2].value,
      listItems[3].value,
    ]);
  });

  it('should emit when item is removed', () => {
    component.itemRemoved
      .subscribe(() => {
        expect(true).toBeTruthy();
      });
    component.remove(listItems[3]);
  });
});


