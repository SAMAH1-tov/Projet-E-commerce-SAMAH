import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product-service';
import { Gallery } from '../../../models/gallery';
import { GalleryService } from '../../../Services/gallery-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { SubCategory } from '../../../models/sub-category';
import { SubcategoryService } from '../../../Services/subcategory-service';

@Component({
  selector: 'app-create-product',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css'],
})
export class CreateProduct implements OnInit {
  product: Product;
  form: FormGroup;
  selectedFile!: File;
  previewUrl: any;
  subcategories: SubCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private galleryService: GalleryService,
    private cdRef: ChangeDetectorRef,
    private subcategoryService: SubcategoryService
  ) 
  {

  }
  initForm(): void {
    this.form = this.fb.group({
      ref: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      url_photo: [null, Validators.required],
      provider : [null, Validators.required],
      orders : [null, Validators.required],
      subcategoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.product = new Product();
    this.initForm();
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.subcategoryService.findAll().subscribe({
      next: (data: SubCategory[]) => {
        console.log('Subcategories loaded:', data);
        this.subcategories = data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sous-catégories:', err);
        this.cdRef.detectChanges();
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  createProduct(): void {
    const product = new Product();
    product.ref = this.form.get('ref')?.value;
    product.description = this.form.get('description')?.value;
    product.price = this.form.get('price')?.value;
    product.quantity = this.form.get('quantity')?.value;
    product.provider = this.form.get('provider')?.value;
    product.orders = this.form.get('orders')?.value;

    // Assigner la sous-catégorie sélectionnée
    const subcategoryId = this.form.get('subcategoryId')?.value;
    if (subcategoryId) {
      product.subcategory = this.subcategories.find(sc => sc.id === subcategoryId);
    }

    if (this.selectedFile) {
      const gallery = new Gallery();
      gallery.url_photo =  this.form.get('url_photo')?.value;
      this.galleryService.save(gallery).subscribe({
        next: (savedGallery: Gallery) => {
          this.galleryService.uploadImage(savedGallery.id, this.selectedFile).subscribe({
            next: (url: string) => {
              savedGallery.url_photo = url;
              product.gallery = savedGallery;
              this.productService.save(product).subscribe({
                next: () => this.router.navigate(['product-list']),
                error: (err: any) => console.error('erreur de création du produit après upload', err)
              });
            },
            error: (err: any) => console.error('erreur upload image', err)
          });
        },
        error: (err: any) => console.error('erreur création gallery', err)
      });
    } else {
      this.productService.save(product).subscribe({
        next: () => this.router.navigate(['product-list']),
        error: (error: any) => console.error('erreur de création du produit', error)
      });
    }
  }
  
}
