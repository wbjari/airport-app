import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RentalService } from '../rental.service';
import { Rental } from '../rental.model';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.css']
})
export class RentalEditComponent extends BaseComponent implements OnInit {
  public rentalForm: FormGroup;

  private id: string;
  private editMode = false;

  constructor(private route: ActivatedRoute,
    private rentalService: RentalService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.loadRental();
      });
  }

  onSubmit() {
    const {id, name} = this.rentalForm.value;
    const rental = new Rental(id, name);

    rental._id = this.id;

    if (this.editMode) {
      this.rentalService.updateRental(rental._id, rental)
        .subscribe((response) => {
          this.rentalService.rentalUpdated.next(response);
        });
    } else {
      this.rentalService.addRental(rental)
        .subscribe((response) => {
          this.rentalService.rentalAdded.next(response);
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private loadRental() {
    let rentalName = '';

    this.initForm(rentalName);

    if (this.editMode) {
      this.rentalService.getRental(this.id)
        .subscribe((response) => {
          const rental = response;
          rentalName = rental.name || '';

          this.rentalForm.setValue({
            'name': rental.name
          });
        });
    }
  }

  private initForm(rentalName) {
    this.rentalForm = new FormGroup({
      'name': new FormControl(rentalName, Validators.required)
    });
  }

}
