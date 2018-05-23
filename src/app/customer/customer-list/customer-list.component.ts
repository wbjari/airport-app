import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  public customers: Customer[];

  private id: string;

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe((response) => {
        console.log(response);
        this.customers = response;
      });
  }

  onNewCustomer() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
