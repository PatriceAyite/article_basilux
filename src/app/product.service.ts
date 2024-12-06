import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'products');
  }

  // Fetch all products from Firestore
  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  // Add a new product to Firestore
  addProduct(product: Product) {
    return addDoc(this.productsCollection, product);
  }

  // Update an existing product in Firestore
  updateProduct(productId: string, product: Product) {
    const productDoc = doc(this.firestore, `products/${productId}`);
    return updateDoc(productDoc, { ...product });
  }

  // Delete a product from Firestore
  deleteProduct(productId: string) {
    const productDoc = doc(this.firestore, `products/${productId}`);
    return deleteDoc(productDoc);
  }
}
