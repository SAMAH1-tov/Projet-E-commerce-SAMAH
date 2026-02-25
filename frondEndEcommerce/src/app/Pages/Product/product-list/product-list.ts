import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product-service';
import { AuthService } from '../../../Services/auth-service';
import { UserService } from '../../../Services/user-service';


@Component({
  selector: 'app-product-list',
  imports: [NavBar, SideBar],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchRef: string = '';

 public constructor(
  private productService: ProductService,
  private cd: ChangeDetectorRef,
  private router: Router,
  private authService: AuthService,
  private userService: UserService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadProduct()
  }

  loadCurrentUser(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService.setCurrentUser(user);
    }
  }

  loadProduct(): void {
    this.productService.findAll().subscribe({
      next: a => {
        this.products = a;
        this.filteredProducts = a;
        this.cd.detectChanges();
      },
    });
  }
  
  filterByRef(ref: string): void {
    this.searchRef = ref;
    if (!ref || ref.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.ref.toLowerCase().includes(ref.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }
  
  updateProduct(id: number): void {
    this.router.navigate(['edit-product/' + id])
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(a => a.id !== id);
        this.filterByRef(this.searchRef);
        this.cd.detectChanges();
      },
      error: err => console.error("Erreur lors de la suppression", err)
    })
  }

}
