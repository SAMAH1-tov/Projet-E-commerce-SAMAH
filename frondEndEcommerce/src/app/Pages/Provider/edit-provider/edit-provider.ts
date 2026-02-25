import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../Services/provider-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product-service';

@Component({
  selector: 'app-edit-provider',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './edit-provider.html',
  styleUrl: './edit-provider.css',
})
export class EditProvider implements OnInit {
  form: FormGroup;
  productForm: FormGroup;
  provider!: Provider;
  isLoading: boolean = true;
  allProducts: Product[] = [];
  availableProducts: Product[] = [];
  assignedProducts: Product[] = [];
  showProductAssignment: boolean = false;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
    private providerService: ProviderService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadProvider();
    this.loadAllProducts();
    this.initProductForm();
  }

  initForm(): void {  
    this.form = this.formBuilder.group({
      firstName: [this.provider.firstName, Validators.required],
      lastName: [this.provider.lastName, Validators.required],
      phone: [this.provider.phone, Validators.required],
      username: [this.provider.username, Validators.required],
      email: [this.provider.email, [Validators.required, Validators.email]],
      password: [this.provider.password, Validators.required],
      company: [this.provider.company, Validators.required]
    });
  }

  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      productId: [null, Validators.required]
    });
  }

  loadProvider(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.providerService.findById(id).subscribe({
        next: (data) => {
          this.provider = data;
          this.assignedProducts = data.products || [];
          this.updateAvailableProducts();
          this.initForm();
          this.isLoading = false;
          console.log('Provider loaded:', data);
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Erreur lors du chargement du fournisseur', error);
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      });
    }
  }

  loadAllProducts(): void {
    this.productService.findAll().subscribe({
      next: (data: Product[]) => {
        this.allProducts = data;
        this.updateAvailableProducts();
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
      }
    });
  }

  updateAvailableProducts(): void {
    this.availableProducts = this.allProducts.filter(product => 
      !this.assignedProducts.some(assigned => assigned.id === product.id)
    );
  }

  toggleProductAssignment(): void {
    this.showProductAssignment = !this.showProductAssignment;
  }

  assignProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productId = this.productForm.get('productId')?.value;
    const selectedProduct = this.allProducts.find(p => p.id === productId);
    
    if (selectedProduct) {
      this.assignedProducts.push(selectedProduct);
      this.updateAvailableProducts();
      this.productForm.get('productId')?.setValue(null);
    }
  }

  removeProduct(product: Product): void {
    const index = this.assignedProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.assignedProducts.splice(index, 1);
      this.updateAvailableProducts();
    }
  }

  updateProvider(): void {
    if (this.form.invalid) {
      console.error('Formulaire invalide');
      this.markFormGroupTouched(this.form);
      return;
    }

    this.provider.firstName = this.form.get('firstName')?.value;
    this.provider.lastName = this.form.get('lastName')?.value;
    this.provider.phone = this.form.get('phone')?.value;
    this.provider.username = this.form.get('username')?.value;
    this.provider.email = this.form.get('email')?.value;
    this.provider.password = this.form.get('password')?.value;
    this.provider.company = this.form.get('company')?.value;
    this.provider.role = 'PROVIDER';
    this.provider.products = this.assignedProducts;

    console.log('Updating provider payload:', this.provider);

    this.providerService.update(this.provider, this.provider.id).subscribe({
      next: (response: any) => {
        console.log('Fournisseur mis à jour avec succès');
        this.router.navigate(['provider-list']);
      },
      error: (error: any) => {
        console.error('Erreur de mise à jour du fournisseur', error);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
