import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../Services/order-service';
import { ProductService } from '../../../Services/product-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/product';
import { Client } from '../../../models/client';
import { ClientsService } from '../../../Services/clients-service';
import { DriverService } from '../../../Services/driver-service';
import { Driver } from '../../../models/driver';


@Component({
  selector: 'app-create-order',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    NgFor,
    NgIf
  ],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css',
})
export class CreateOrder implements OnInit {
  order: Order;
  form: FormGroup;
  products: Product[] = [];
  clients: Client[] = [];
  drivers: Driver[] = [];
  productsArray: FormArray;
  driversArray: FormArray;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientsService,
    private driverService: DriverService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.order = new Order();
    this.loadProducts();
    this.loadClients();
    this.initForm();
  }

  loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
      }
    });
  }

  loadClients(): void {
    this.clientService.findAll().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      },
      error: (error: any) => {
        console.error('Error loading clients:', error);
      }
    });
  }
  loadDrivers(): void {
    this.driverService.findAll().subscribe({
      next: (data) => {
        this.drivers = data;
      },
    });
  }

  initForm(): void {
    this.productsArray = this.formBuilder.array([]);
    this.driversArray = this.formBuilder.array([]);
    this.form = this.formBuilder.group({
      ref: [null, Validators.required],
      client: [null, Validators.required],
      description: [null, Validators.required],
      state: [null, Validators.required],
      products: this.productsArray,
      driver: this.driversArray
    });
  }

  get formProducts(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addProduct(): void {
    const productForm = this.formBuilder.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.formProducts.push(productForm);
  }

  removeProduct(index: number): void {
    this.formProducts.removeAt(index);
    this.calculateTotals();
  }

  calculateTotals(): any {
    let totalQuantity = 0;
    let totalPrice = 0;

    this.formProducts.controls.forEach((control, index) => {
      const productId = control.get('productId')?.value;
      const quantity = control.get('quantity')?.value || 1;
      
      const selectedProduct = this.products.find(p => p.id === productId);
      if (selectedProduct) {
        totalQuantity += quantity;
        totalPrice += (selectedProduct.price * quantity);
      }
    });

    return { totalQuantity, totalPrice };
  }

  createOrder(): void {
    if (!this.form.valid || this.formProducts.length === 0) {
      alert('Veuillez remplir tous les champs et ajouter au moins un produit!');
      return;
    }

    const order = new Order();
    order.ref = this.form.get('ref')?.value;
    order.description = this.form.get('description')?.value;
    order.state = this.form.get('state')?.value;
    order.client = this.form.get('client')?.value;
    order.driver = this.form.get('driver')?.value;

    const productsData: any[] = [];
    this.formProducts.controls.forEach((control, index) => {
      const productId = control.get('productId')?.value;
      const quantity = control.get('quantity')?.value;
      const selectedProduct = this.products.find(p => p.id === productId);
      
      if (selectedProduct) {
        productsData.push({
          ...selectedProduct,
          quantity: quantity
        });
      }
    });

    order.products = productsData;

    const totals = this.calculateTotals();
    order.quantity_total = totals.totalQuantity;
    order.price_total = totals.totalPrice;

    this.orderService.save(order).subscribe({
      next: (response: any) => {
        this.router.navigate(['order-list']);
      },
      error: (error: any) => {
        console.error('Error creating order:', error);
      }
    });
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.ref : '';
  }

  getProductPrice(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.price : 0;
  }
}
