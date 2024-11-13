import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../../products.service';
import {Product} from '../../models/product.model';
import {Product2} from '../../models/product.model';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

interface DisplayProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  type: 'product' | 'product2'; // Xác định loại sản phẩm
}

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  displayProducts: DisplayProduct[] = []; // Mảng hợp nhất sản phẩm
  product: Product | null = null;
  product2: Product2 | null = null;

  quantity = 1;

  constructor(private productService: ProductService,
              private route : ActivatedRoute
  ) {}

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      if (type === 'product') {
        const product = this.productService.getSelectedProduct();
        if (product) this.displayProducts = [{ ...product, type: 'product' }];
      } else if (type === 'product2') {
        const product2 = this.productService.getSelectedProduct2();
        if (product2) this.displayProducts = [{ ...product2, type: 'product2' }];
      }
    });
  }
}
