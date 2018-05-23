import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Rental } from '../rental.model';
import { RentalService } from '../rental.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html'
})
export class RentalListComponent extends BaseComponent implements OnInit {
  public rentals: Rental[];

  private id: string;

  constructor(private rentalService: RentalService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.rentalService.getRentals()
      .subscribe((response) => {
        console.log(response);
        this.rentals = response;
      });
  }

  onNewRental() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
