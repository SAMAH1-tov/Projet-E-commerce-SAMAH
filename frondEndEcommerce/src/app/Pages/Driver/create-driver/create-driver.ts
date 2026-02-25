import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Driver } from '../../../models/driver';
import { DriverService } from '../../../Services/driver-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";
import { EncryptionService } from '../../../Services/encryption-service';

@Component({
  selector: 'app-create-driver',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
  ],
  templateUrl: './create-driver.html',
  styleUrl: './create-driver.css',
})
export class CreateDriver implements OnInit {
  driver: Driver;
  form: FormGroup;

  constructor(
    private driverService: DriverService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    this.driver = new Driver();
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      adresse: [null, Validators.required]
    });
  }

  createDriver(): void {
    if (this.form.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    const driver = new Driver();
    driver.firstName = this.form.get('firstName')?.value;
    driver.lastName = this.form.get('lastName')?.value;
    driver.phone = this.form.get('phone')?.value;
    driver.username = this.form.get('username')?.value;
    driver.email = this.form.get('email')?.value;
    
    // Crypter le mot de passe comme dans l'inscription
    const plainPassword = this.form.get('password')?.value;
    driver.password = this.encryptionService.encryptPassword(plainPassword);
    
    driver.adresse = this.form.get('adresse')?.value;
    driver.role = 'DRIVER';

    console.log('Creating driver with encrypted password:', {
      ...driver,
      password: '[ENCRYPTED]' // Ne pas afficher le mot de passe crypté dans les logs
    });

    this.driverService.save(driver).subscribe({
      next: (response: any) => {
        console.log('Driver created successfully:', response);
        this.router.navigate(['driver-list']);
      },
      error: (error: any) => {
        console.error('Error creating driver:', error);
      }
    });
  }
}
