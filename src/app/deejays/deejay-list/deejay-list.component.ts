import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deejay } from '../deejay.model';
import { DeejayService } from '../deejay.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-deejay-list',
  templateUrl: './deejay-list.component.html'
})
export class DeejayListComponent extends BaseComponent implements OnInit {
  public deejays: Deejay[];

  private id: string;

  constructor(private deejayService: DeejayService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.deejayService.getDeejays()
      .subscribe((response) => {
        console.log(response);
        this.deejays = response;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
