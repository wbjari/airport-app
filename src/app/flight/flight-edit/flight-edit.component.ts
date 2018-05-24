import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent extends BaseComponent implements OnInit {
  public flightForm: FormGroup;

  private id: string;
  private editMode = false;

  constructor(private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.loadFlight();
      });
  }

  onSubmit() {
    const {id, name, date, departure, arrival, location} = this.flightForm.value;
    const flight = new Flight(id, name, date, departure, arrival, location);

    flight._id = this.id;

    if (this.editMode) {
      this.flightService.updateFlight(flight._id, flight)
        .subscribe((response) => {
          this.flightService.flightUpdated.next(response);
        });
    } else {
      this.flightService.addFlight(flight)
        .subscribe((response) => {
          this.flightService.flightAdded.next(response);
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private loadFlight() {
    let flightName = '';
    let flightDate = '';
    let flightDeparture = '';
    let flightArrival = '';
    let flightLocation = '';

    this.initForm(flightName, flightDate, flightDeparture, flightArrival, flightLocation);

    if (this.editMode) {
      this.flightService.getFlight(this.id)
        .subscribe((response) => {
          const flight = response;
          flightName = flight.name || '';
          flightDate = flight.date || '';
          flightDeparture = flight.departure || '';
          flightArrival = flight.arrival || '';
          flightLocation = flight.location || '';

          this.flightForm.setValue({
            'name': flight.name,
            'date': flight.date,
            'departure': flight.departure,
            'arrival': flight.arrival,
            'location': flight.location
          });
        });
    }
  }

  private initForm(flightName, flightDate, flightDeparture, flightArrival, flightLocation) {
    this.flightForm = new FormGroup({
      'name': new FormControl(flightName, Validators.required),
      'date': new FormControl(flightDate, Validators.required),
      'departure': new FormControl(flightDeparture, Validators.required),
      'arrival': new FormControl(flightArrival, Validators.required),
      'location': new FormControl(flightLocation, Validators.required)
    });
  }

}
