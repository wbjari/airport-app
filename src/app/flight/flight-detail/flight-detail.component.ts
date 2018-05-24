import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Flight } from '../flight.model';
import { FlightService } from '../flight.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html'
})
export class FlightDetailComponent extends BaseComponent implements OnInit {
  public flight: Flight;

  private id: string;

  constructor(private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.flightService.getFlight(this.id)
          .subscribe((flight) => {
            this.id = flight._id;
            this.flight = flight;
          });
      });
  }

  onEditFlight() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteFlight() {
    this.flightService.deleteFlight(this.id)
      .subscribe(() => {
        this.flightService.flightDeleted.next(this.id);
      });
    this.router.navigate(['/flights']);
  }
}
