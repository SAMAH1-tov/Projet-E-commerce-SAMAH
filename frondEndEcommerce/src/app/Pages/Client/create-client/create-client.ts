import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Client } from '../../../models/client';

import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';
import { ClientsService } from '../../../Services/clients-service';

@Component({
  selector: 'app-create-client',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css',
})
export class CreateClient implements OnInit {
  client: Client;
  form: FormGroup;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.client = new Client();
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      localization: [null, Validators.required]
    });
  }

  createClient(): void {
    const client = new Client();
    client.firstName = this.form.get('firstName')?.value;
    client.lastName = this.form.get('lastName')?.value;
    client.phone = this.form.get('phone')?.value;
    client.username = this.form.get('username')?.value;
    client.email = this.form.get('email')?.value;
    client.password = this.form.get('password')?.value;
    client.localization = this.form.get('localization')?.value;
    client.role = 'CLIENT';

    this.clientService.save(client).subscribe({
      next: () => {
        this.router.navigate(['client-list']);
      },
      error: (error) => {
        console.error('Erreur de création', error);
      }
    });
  }
}
