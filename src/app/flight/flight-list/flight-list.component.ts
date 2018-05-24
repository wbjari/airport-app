import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Flight } from '../flight.model';
import { FlightService } from '../flight.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html'
})
export class FlightListComponent extends BaseComponent implements OnInit {
  public flights: Flight[];

  private id: string;

  constructor(private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.flightService.getFlights()
      .subscribe((response) => {
        console.log(response);
        this.flights = response;
      });
  }

  onNewFlight() {
    this.router.navigate(['flights/new']);
  }

}
