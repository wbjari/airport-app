import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Security } from '../security.model';
import { SecurityService } from '../security.service';
import { BaseComponent } from '../../shared/basecomponent.class';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html'
})
export class SecurityListComponent extends BaseComponent implements OnInit {
  public securities: Security[];

  private id: string;

  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.securityService.getSecurities()
      .subscribe((response) => {
        console.log(response);
        this.securities = response;
      });
  }

  onNewSecurity() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
