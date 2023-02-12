import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:'products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<any>();
  sort = 'Asc';
  itemsShowCount=12
  constructor() {}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }
  onSortUpdated(newSort: any): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }



}
