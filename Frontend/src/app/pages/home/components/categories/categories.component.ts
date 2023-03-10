import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl:'categories.component.html'
})
export class CategoriesComponent {

  @Output() showCategory = new EventEmitter<string>();

  categories =[ 'PC','SMARTPHONE','GAMING','ACCESSORIES','TV','TABLETS']
  
  constructor(){}

  onShowCategory(category: string): void {
    this.showCategory.next(category);
    
  }
}
