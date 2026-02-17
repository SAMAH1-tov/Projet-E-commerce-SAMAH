import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../Services/order-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-edit-order',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
  ],
  templateUrl: './edit-order.html',
  styleUrl: './edit-order.css',
})
export class EditOrder implements OnInit {
  order: Order;
  form: FormGroup;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.orderService.findById(id).subscribe(data => {
      this.order = data;
      this.initForm();
      console.log(data);
      this.cdRef.detectChanges();
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      ref: [this.order.ref, Validators.required],
      description: [this.order.description, Validators.required],
      quantity_total: [this.order.quantity_total, [Validators.required, Validators.min(1)]],
      price_total: [this.order.price_total, [Validators.required, Validators.min(0)]],
      state: [this.order.state, Validators.required]
    });
  }

  updateOrder(): void {
    this.order.ref = this.form.get('ref')?.value;
    this.order.description = this.form.get('description')?.value;
    this.order.quantity_total = this.form.get('quantity_total')?.value;
    this.order.price_total = this.form.get('price_total')?.value;
    this.order.state = this.form.get('state')?.value;
    this.orderService.save(this.order).subscribe({
      next: (response: any) => {
        this.router.navigate(['order-list']);
      },
      error: (error: any) => {
        console.error('Error updating order:', error);
      }
    });
  }
}
