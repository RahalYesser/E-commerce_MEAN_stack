import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:'products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'Desc';
  itemsShowCount=12
  constructor() {}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }
  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

}
