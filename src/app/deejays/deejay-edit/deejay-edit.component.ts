import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { DeejayService } from '../deejay.service';
import { Deejay } from '../deejay.model';
import { BaseComponent } from '../../shared/basecomponent.class';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-deejay-edit',
  templateUrl: './deejay-edit.component.html',
  styleUrls: ['./deejay-edit.component.css']
})
export class DeejayEditComponent extends BaseComponent implements OnInit {
  public deejayForm: FormGroup;

  private id: string;
  private editMode = false;

  constructor(private route: ActivatedRoute,
    private deejayService: DeejayService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.loadDeejay();
      });
  }

  onSubmit() {
    const { id, name, age, description, imagePath, genres } = this.deejayForm.value;
    const deejay = new Deejay(id, name, age, description, imagePath, genres);

    deejay._id = this.id;

    if (this.editMode) {
      this.deejayService.updateDeejay(deejay._id, deejay)
        .subscribe((response) => {
          this.deejayService.deejayUpdated.next(response);
        });
    } else {
      this.deejayService.addDeejay(deejay)
        .subscribe((response) => {
          this.deejayService.deejayAdded.next(response);
        });
    }
  }

  onAddGenre() {
    (<FormArray>this.deejayForm.get('genres')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteGenre(index: number) {
    (<FormArray>this.deejayForm.get('genres')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.deejayForm.get('genres')).controls;
  }

  private loadDeejay() {
    let deejayName = '';
    let deejayAge = '';
    let deejayDescription = '';
    let deejayImagePath = '';
    const deejayGenres = new FormArray([]);

    this.initForm(deejayName, deejayAge, deejayDescription, deejayImagePath, deejayGenres);

    if (this.editMode) {
      this.deejayService.getDeejay(this.id)
        .subscribe((response) => {
          const deejay = response;
          deejayName = deejay.name || '';
          deejayAge = deejay.age || '';
          deejayDescription = deejay.description || '';
          deejayImagePath = deejay.imagePath || '';

          if (deejay['genres']) {
            for (const genre of deejay.genres) {
              deejayGenres.push(
                new FormGroup({
                  'name': new FormControl(genre.name, Validators.required)
                })
              );
            }
          }

          this.deejayForm.setValue({
            'name': deejay.name,
            'age': deejay.imagePath,
            'description': deejay.description,
            'imagePath': deejay.imagePath,
            'genres': deejayGenres
          });
        });
    }
  }

  private initForm(deejayName, deejayAge, deejayDescription, deejayImagePath, deejayGenres) {
    this.deejayForm = new FormGroup({
      'name': new FormControl(deejayName, Validators.required),
      'age': new FormControl(deejayAge, Validators.required),
      'description': new FormControl(deejayDescription, Validators.required),
      'imagePath': new FormControl(deejayImagePath, Validators.required),
      'genres': deejayGenres
    });
  }

}
