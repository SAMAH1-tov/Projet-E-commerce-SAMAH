import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';
import {OrderService} from '../../../Services/order-service';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-order-list',
  imports: [NavBar, SideBar],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm: string = '';

  public constructor(private orderService: OrderService, private cd: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.findAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.cd.detectChanges();
      },
    });
  }

  filterByRef(term: string): void {
    this.searchTerm = term;
    if (!term || term.trim() === '') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order =>
        (order.ref || '').toLowerCase().includes(term.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }

  updateOrder(id: number): void {
    this.router.navigate(['edit-order/' + id]);
  }

  deleteOrder(id: number): void {
    this.orderService.delete(id).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.id !== id);
        this.filterByRef(this.searchTerm);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    });
  }
}
