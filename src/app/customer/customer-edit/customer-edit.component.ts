import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent extends BaseComponent implements OnInit {
  public customerForm: FormGroup;

  private id: string;
  private editMode = false;

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.loadCustomer();
      });
  }

  onSubmit() {
    const {id, name} = this.customerForm.value;
    const customer = new Customer(id, name);

    customer._id = this.id;

    if (this.editMode) {
      this.customerService.updateCustomer(customer._id, customer)
        .subscribe((response) => {
          this.customerService.customerUpdated.next(response);
        });
    } else {
      this.customerService.addCustomer(customer)
        .subscribe((response) => {
          this.customerService.customerAdded.next(response);
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private loadCustomer() {
    let customerName = '';

    this.initForm(customerName);

    if (this.editMode) {
      this.customerService.getCustomer(this.id)
        .subscribe((response) => {
          const customer = response;
          customerName = customer.name || '';

          this.customerForm.setValue({
            'name': customer.name
          });
        });
    }
  }

  private initForm(customerName) {
    this.customerForm = new FormGroup({
      'name': new FormControl(customerName, Validators.required)
    });
  }

}
