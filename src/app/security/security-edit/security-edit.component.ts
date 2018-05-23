import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SecurityService } from '../security.service';
import { Security } from '../security.model';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-security-edit',
  templateUrl: './security-edit.component.html',
  styleUrls: ['./security-edit.component.css']
})
export class SecurityEditComponent extends BaseComponent implements OnInit {
  public securityForm: FormGroup;

  private id: string;
  private editMode = false;

  constructor(private route: ActivatedRoute,
    private securityService: SecurityService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.loadSecurity();
      });
  }

  onSubmit() {
    const {id, name} = this.securityForm.value;
    const security = new Security(id, name);

    security._id = this.id;

    if (this.editMode) {
      this.securityService.updateSecurity(security._id, security)
        .subscribe((response) => {
          this.securityService.securityUpdated.next(response);
        });
    } else {
      this.securityService.addSecurity(security)
        .subscribe((response) => {
          this.securityService.securityAdded.next(response);
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private loadSecurity() {
    let securityName = '';

    this.initForm(securityName);

    if (this.editMode) {
      this.securityService.getSecurity(this.id)
        .subscribe((response) => {
          const security = response;
          securityName = security.name || '';

          this.securityForm.setValue({
            'name': security.name
          });
        });
    }
  }

  private initForm(securityName) {
    this.securityForm = new FormGroup({
      'name': new FormControl(securityName, Validators.required)
    });
  }

}
