import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../Services/provider-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';
import { EncryptionService } from '../../../Services/encryption-service';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product-service';

@Component({
  selector: 'app-create-provider',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './create-provider.html',
  styleUrl: './create-provider.css',
})
export class CreateProvider implements OnInit {
  provider: Provider;
  form: FormGroup;
  productForm: FormGroup;
  allProducts: Product[] = [];
  availableProducts: Product[] = [];
  assignedProducts: Product[] = [];
  showProductAssignment: boolean = false;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private encryptionService: EncryptionService,
    private productService: ProductService
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      company: [null, Validators.required]
    });

    this.productForm = this.fb.group({
      productId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.provider = new Provider();
    this.initForm();
    this.loadAllProducts();
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

  createProvider(): void {
    if (this.form.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    const provider = new Provider();
    provider.firstName = this.form.get('firstName')?.value;
    provider.lastName = this.form.get('lastName')?.value;
    provider.phone = this.form.get('phone')?.value;
    provider.username = this.form.get('username')?.value;
    provider.email = this.form.get('email')?.value;
    
    // Crypter le mot de passe comme dans l'inscription
    const plainPassword = this.form.get('password')?.value;
    provider.password = this.encryptionService.encryptPassword(plainPassword);
    
    provider.company = this.form.get('company')?.value;
    provider.role = 'PROVIDER';
    provider.products = this.assignedProducts;

    console.log('Creating provider with encrypted password:', {
      ...provider,
      password: '[ENCRYPTED]',
      products: provider.products.length
    });

    this.providerService.save(provider).subscribe({
      next: (response: any) => {
        console.log('Provider created successfully:', response);
        this.router.navigate(['provider-list']);
      },
      error: (error: any) => {
        console.error('erreur de création du fournisseur', error);
      }
    });
  }
}
