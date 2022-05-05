import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: string[] = [];

  @Output() chosen: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
