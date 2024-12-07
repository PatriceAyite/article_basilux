import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  editProductForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.editProductForm = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
  }

  openEditModal(product: Product) {
    this.editProductForm.patchValue(product);
    const editProductModal = new Modal(document.getElementById('editProductModal')!, {
      keyboard: false
    });
    editProductModal.show();
  }

  updateProduct() {
    const updatedProduct = this.editProductForm.value;
    this.productService.updateProduct(updatedProduct.id, updatedProduct).then(() => {
      const editProductModal = Modal.getInstance(document.getElementById('editProductModal')!)!;
      editProductModal.hide();
    });
  }

  openViewMoreModal(product: Product) {
    this.selectedProduct = product;
    const viewMoreModal = new Modal(document.getElementById('viewMoreModal')!, {
      keyboard: false
    });
    viewMoreModal.show();
  }
}
