import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";


@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ProductListComponent]
})
export class AppComponent {
  title = 'product-management';
}
