import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/models.ts/filters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public selectedFilter: Filter = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params) this.selectedFilter = params;
      else this.selectedFilter = {};
    });
  }
}
