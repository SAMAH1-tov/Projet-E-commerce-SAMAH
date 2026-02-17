import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../Services/provider-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      company: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.provider = new Provider();
    this.initForm();
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
    provider.password = this.form.get('password')?.value;
    provider.company = this.form.get('company')?.value;
    provider.role = 'PROVIDER';

    console.log('Creating provider payload:', provider);

    this.providerService.save(provider).subscribe({
      next: () => {
        console.log('Fournisseur créé avec succès');
        this.router.navigate(['provider-list']);
      },
      error: (error: any) => {
        console.error('erreur de création du fournisseur', error);
      }
    });
  }
}
